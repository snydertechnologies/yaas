import { ILoginDTO, IRegisterDTO } from '@bigcapital/libs-backend';
import BaseController from '@bigcapital/server/api/controllers/BaseController';
import LoginThrottlerMiddleware from '@bigcapital/server/api/middleware/LoginThrottlerMiddleware';
import asyncMiddleware from '@bigcapital/server/api/middleware/asyncMiddleware';
import { DATATYPES_LENGTH } from '@bigcapital/server/data/DataTypes';
import { ServiceError } from '@bigcapital/server/exceptions';
import AuthenticationApplication from '@bigcapital/server/services/Authentication/AuthApplication';
import { Request, Response, Router } from 'express';
import { ValidationChain, check } from 'express-validator';
import { Inject, Service } from 'typedi';

import AttachCurrentTenantUser from '@bigcapital/server/api/middleware/AttachCurrentTenantUser';
import JWTAuth from '@bigcapital/server/api/middleware/jwtAuth';
@Service()
export default class AuthenticationController extends BaseController {
  @Inject()
  private authApplication: AuthenticationApplication;

  /**
   * Constructor method.
   */
  public router() {
    const router = Router();

    router.post(
      '/login',
      this.loginSchema,
      this.validationResult,
      LoginThrottlerMiddleware,
      asyncMiddleware(this.login.bind(this)),
      this.handlerErrors,
    );
    router.use('/register/verify/resend', JWTAuth);
    router.use('/register/verify/resend', AttachCurrentTenantUser);
    router.post(
      '/register/verify/resend',
      asyncMiddleware(this.registerVerifyResendMail.bind(this)),
      this.handlerErrors,
    );
    router.post(
      '/register/verify',
      this.signupVerifySchema,
      this.validationResult,
      asyncMiddleware(this.registerVerify.bind(this)),
      this.handlerErrors,
    );
    router.post(
      '/register',
      this.registerSchema,
      this.validationResult,
      asyncMiddleware(this.register.bind(this)),
      this.handlerErrors,
    );
    router.post(
      '/send_reset_password',
      this.sendResetPasswordSchema,
      this.validationResult,
      asyncMiddleware(this.sendResetPassword.bind(this)),
      this.handlerErrors,
    );
    router.post(
      '/reset/:token',
      this.resetPasswordSchema,
      this.validationResult,
      asyncMiddleware(this.resetPassword.bind(this)),
      this.handlerErrors,
    );
    router.get('/meta', asyncMiddleware(this.getAuthMeta.bind(this)));
    return router;
  }

  /**
   * Login validation schema.
   * @returns {ValidationChain[]}
   */
  private get loginSchema(): ValidationChain[] {
    return [check('crediential').exists().isEmail(), check('password').exists().isLength({ min: 5 })];
  }

  /**
   * Register validation schema.
   * @returns {ValidationChain[]}
   */
  private get registerSchema(): ValidationChain[] {
    return [
      check('first_name').exists().isString().trim().escape().isLength({ max: DATATYPES_LENGTH.STRING }),
      check('last_name').exists().isString().trim().escape().isLength({ max: DATATYPES_LENGTH.STRING }),
      check('email').exists().isString().isEmail().trim().escape().isLength({ max: DATATYPES_LENGTH.STRING }),
      check('password')
        .exists()
        .isString()
        .isLength({ min: 6 })
        .trim()
        .escape()
        .isLength({ max: DATATYPES_LENGTH.STRING }),
    ];
  }

  private get signupVerifySchema(): ValidationChain[] {
    return [
      check('email').exists().isString().isEmail().isLength({ max: DATATYPES_LENGTH.STRING }),
      check('token').exists().isString(),
    ];
  }

  /**
   * Reset password schema.
   * @returns {ValidationChain[]}
   */
  private get resetPasswordSchema(): ValidationChain[] {
    return [
      check('password')
        .exists()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
          if (value !== req.body.confirm_password) {
            throw new Error("Passwords don't match");
          } else {
            return value;
          }
        }),
    ];
  }

  /**
   * Send reset password validation schema.
   * @returns {ValidationChain[]}
   */
  private get sendResetPasswordSchema(): ValidationChain[] {
    return [check('email').exists().isEmail().trim().escape()];
  }

  /**
   * Handle user login.
   * @param {Request} req
   * @param {Response} res
   */
  private async login(req: Request, res: Response, next: Function): Response {
    const userDTO: ILoginDTO = this.matchedBodyData(req);

    try {
      const { token, user, tenant } = await this.authApplication.signIn(userDTO.crediential, userDTO.password);
      return res.status(200).send({ token, user, tenant });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Organization register handler.
   * @param {Request} req
   * @param {Response} res
   */
  private async register(req: Request, res: Response, next: Function) {
    const registerDTO: IRegisterDTO = this.matchedBodyData(req);

    try {
      await this.authApplication.signUp(registerDTO);

      return res.status(200).send({
        type: 'success',
        code: 'REGISTER.SUCCESS',
        message: 'Register organization has been success.',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifies the provider user's email after signin-up.
   * @param {Request} req
   * @param {Response}| res
   * @param {Function} next
   * @returns {Response|void}
   */
  private async registerVerify(req: Request, res: Response, next: Function) {
    const signUpVerifyDTO: { email: string; token: string } = this.matchedBodyData(req);

    try {
      const user = await this.authApplication.signUpConfirm(signUpVerifyDTO.email, signUpVerifyDTO.token);
      return res.status(200).send({
        type: 'success',
        message: 'The given user has verified successfully',
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Resends the confirmation email to the user.
   * @param {Request} req
   * @param {Response}| res
   * @param {Function} next
   */
  private async registerVerifyResendMail(req: Request, res: Response, next: Function) {
    const { user } = req;

    try {
      const data = await this.authApplication.signUpConfirmResend(user.id);

      return res.status(200).send({
        type: 'success',
        message: 'The given user has verified successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Send reset password handler
   * @param {Request} req
   * @param {Response} res
   */
  private async sendResetPassword(req: Request, res: Response, next: Function) {
    const { email } = this.matchedBodyData(req);

    try {
      await this.authApplication.sendResetPassword(email);

      return res.status(200).send({
        code: 'SEND_RESET_PASSWORD_SUCCESS',
        message: 'The reset password message has been sent successfully.',
      });
    } catch (error) {
      if (error instanceof ServiceError) {
      }
      next(error);
    }
  }

  /**
   * Reset password handler
   * @param {Request} req
   * @param {Response} res
   */
  private async resetPassword(req: Request, res: Response, next: Function) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      await this.authApplication.resetPassword(token, password);

      return res.status(200).send({
        type: 'RESET_PASSWORD_SUCCESS',
        message: 'The password has been reset successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves the authentication meta for SPA.
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @returns {Response|void}
   */
  private async getAuthMeta(req: Request, res: Response, next: Function) {
    try {
      const meta = await this.authApplication.getAuthMeta();

      return res.status(200).send({ meta });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles the service errors.
   */
  private handlerErrors(error, req: Request, res: Response, next: Function) {
    if (error instanceof ServiceError) {
      if (['INVALID_DETAILS', 'invalid_password'].indexOf(error.errorType) !== -1) {
        return res.boom.badRequest(null, {
          errors: [{ type: 'INVALID_DETAILS', code: 100 }],
        });
      }
      if (error.errorType === 'USER_INACTIVE') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'USER_INACTIVE', code: 200 }],
        });
      }
      if (error.errorType === 'TOKEN_INVALID' || error.errorType === 'TOKEN_EXPIRED') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'TOKEN_INVALID', code: 300 }],
        });
      }
      if (error.errorType === 'USER_NOT_FOUND') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'USER_NOT_FOUND', code: 400 }],
        });
      }
      if (error.errorType === 'EMAIL_NOT_FOUND') {
        return res.status(400).send({
          errors: [{ type: 'EMAIL.NOT.REGISTERED', code: 500 }],
        });
      }
      if (error.errorType === 'EMAIL_EXISTS') {
        return res.status(400).send({
          errors: [{ type: 'EMAIL.EXISTS', code: 600 }],
        });
      }
      if (error.errorType === 'SIGNUP_RESTRICTED') {
        return res.status(400).send({
          errors: [
            {
              type: 'SIGNUP_RESTRICTED',
              message: 'Sign-up is restricted no one can sign-up to the system.',
              code: 700,
            },
          ],
        });
      }
      if (error.errorType === 'SIGNUP_RESTRICTED_NOT_ALLOWED') {
        return res.status(400).send({
          errors: [
            {
              type: 'SIGNUP_RESTRICTED_NOT_ALLOWED',
              message: 'Sign-up is restricted the given email address is not allowed to sign-up.',
              code: 710,
            },
          ],
        });
      }
    }
    next(error);
  }
}
