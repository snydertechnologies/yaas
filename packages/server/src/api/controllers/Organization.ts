import { NextFunction, Request, Response, Router } from 'express';
import { ValidationChain, check } from 'express-validator';
import moment from 'moment-timezone';
import { Inject, Service } from 'typedi';

import AttachCurrentTenantUser from '@bigcapital/server/api/middleware/AttachCurrentTenantUser';
import SubscriptionMiddleware from '@bigcapital/server/api/middleware/SubscriptionMiddleware';
import TenancyMiddleware from '@bigcapital/server/api/middleware/TenancyMiddleware';
import asyncMiddleware from '@bigcapital/server/api/middleware/asyncMiddleware';
import JWTAuth from '@bigcapital/server/api/middleware/jwtAuth';
import { DATE_FORMATS } from '@bigcapital/server/services/Miscellaneous/DateFormats/constants';
import OrganizationService from '@bigcapital/server/services/Organization/OrganizationService';
import { ACCEPTED_LOCALES, MONTHS } from '@bigcapital/server/services/Organization/constants';

import BaseController from '@bigcapital/server/api/controllers/BaseController';
import { ServiceError } from '@bigcapital/server/exceptions';

@Service()
export default class OrganizationController extends BaseController {
  @Inject()
  organizationService: OrganizationService;

  /**
   * Router constructor.
   */
  router() {
    const router = Router();

    // Should before build tenant database the user be authorized and
    // most important than that, should be subscribed to any plan.
    router.use(JWTAuth);
    router.use(AttachCurrentTenantUser);
    router.use(TenancyMiddleware);

    router.use('/build', SubscriptionMiddleware('main'));
    router.post(
      '/build',
      this.buildOrganizationValidationSchema,
      this.validationResult,
      asyncMiddleware(this.build.bind(this)),
      this.handleServiceErrors.bind(this),
    );
    router.put(
      '/',
      this.updateOrganizationValidationSchema,
      this.validationResult,
      this.asyncMiddleware(this.updateOrganization.bind(this)),
      this.handleServiceErrors.bind(this),
    );
    router.get('/', asyncMiddleware(this.currentOrganization.bind(this)), this.handleServiceErrors.bind(this));
    return router;
  }

  /**
   * Organization setup schema.
   * @return {ValidationChain[]}
   */
  private get commonOrganizationValidationSchema(): ValidationChain[] {
    return [
      check('name').exists().trim(),
      check('industry').optional({ nullable: true }).isString().trim().escape(),
      check('location').exists().isString().isISO31661Alpha2(),
      check('base_currency').exists().isISO4217(),
      check('timezone').exists().isIn(moment.tz.names()),
      check('fiscal_year').exists().isIn(MONTHS),
      check('language').exists().isString().isIn(ACCEPTED_LOCALES),
      check('date_format').optional().isIn(DATE_FORMATS),
    ];
  }

  /**
   * Build organization validation schema.
   * @returns {ValidationChain[]}
   */
  private get buildOrganizationValidationSchema(): ValidationChain[] {
    return [...this.commonOrganizationValidationSchema];
  }

  /**
   * Update organization validation schema.
   * @returns {ValidationChain[]}
   */
  private get updateOrganizationValidationSchema(): ValidationChain[] {
    return [
      ...this.commonOrganizationValidationSchema,
      check('tax_number').optional({ nullable: true }).isString().trim().escape(),
    ];
  }

  /**
   * Builds tenant database and migrate database schema.
   * @param {Request} req - Express request.
   * @param {Response} res - Express response.
   * @param {NextFunction} next
   */
  private async build(req: Request, res: Response, next: Function) {
    const { tenantId, user } = req;
    const buildDTO = this.matchedBodyData(req);

    try {
      const result = await this.organizationService.buildRunJob(tenantId, buildDTO, user);
      return res.status(200).send({
        type: 'success',
        code: 'ORGANIZATION.DATABASE.INITIALIZED',
        message: 'The organization database has been initialized.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve the current organization of the associated authenticated user.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private async currentOrganization(req: Request, res: Response, next: NextFunction) {
    const { tenantId } = req;

    try {
      const organization = await this.organizationService.currentOrganization(tenantId);
      return res.status(200).send({
        organization: this.transfromToResponse(organization),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update the organization information.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns
   */
  private async updateOrganization(req: Request, res: Response, next: NextFunction) {
    const { tenantId } = req;
    const tenantDTO = this.matchedBodyData(req);

    try {
      await this.organizationService.updateOrganization(tenantId, tenantDTO);

      return res.status(200).send(
        this.transfromToResponse({
          tenantId,
          message: 'Organization information has been updated successfully.',
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles service errors.
   * @param {Error} error
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private handleServiceErrors(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ServiceError) {
      if (error.errorType === 'tenant_not_found') {
        return res.status(400).send({
          errors: [{ type: 'TENANT.NOT.FOUND', code: 100 }],
        });
      }
      if (error.errorType === 'TENANT_ALREADY_BUILT') {
        return res.status(400).send({
          errors: [{ type: 'TENANT_ALREADY_BUILT', code: 200 }],
        });
      }
      if (error.errorType === 'TENANT_IS_BUILDING') {
        return res.status(400).send({
          errors: [{ type: 'TENANT_IS_BUILDING', code: 300 }],
        });
      }
      if (error.errorType === 'BASE_CURRENCY_MUTATE_LOCKED') {
        return res.status(400).send({
          errors: [{ type: 'BASE_CURRENCY_MUTATE_LOCKED', code: 400 }],
        });
      }
    }
    next(error);
  }
}
