import { Intent, Position } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import { Link, useHistory, useParams } from 'react-router-dom';

import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import AuthInsider from '@bigcapital/webapp/containers/Authentication/AuthInsider';
import { useAuthResetPassword } from '@bigcapital/webapp/hooks/query';

import { useAuthMetaBoot } from './AuthMetaBoot';
import ResetPasswordForm from './ResetPasswordForm';
import { AuthFooterLink, AuthFooterLinks, AuthInsiderCard } from './_components';
import { ResetPasswordSchema } from './utils';

const initialValues = {
  password: '',
  confirm_password: '',
};
/**
 * Reset password page.
 */
export default function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();

  // Authentication reset password.
  const { mutateAsync: authResetPasswordMutate } = useAuthResetPassword();

  // Handle the form submitting.
  const handleSubmit = (values, { setSubmitting }) => {
    authResetPasswordMutate([token, values])
      .then((response) => {
        AppToaster.show({
          message: intl.get('password_successfully_updated'),
          intent: Intent.SUCCESS,
          position: Position.BOTTOM,
        });
        history.push('/auth/login');
        setSubmitting(false);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          if (errors.find((e) => e.type === 'TOKEN_INVALID')) {
            AppToaster.show({
              message: intl.get('an_unexpected_error_occurred'),
              intent: Intent.DANGER,
              position: Position.BOTTOM,
            });
            history.push('/auth/login');
          }
          setSubmitting(false);
        },
      );
  };

  return (
    <AuthInsider>
      <AuthInsiderCard>
        <Formik
          initialValues={initialValues}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
          component={ResetPasswordForm}
        />
      </AuthInsiderCard>

      <ResetPasswordFooterLinks />
    </AuthInsider>
  );
}

function ResetPasswordFooterLinks() {
  const { signupDisabled } = useAuthMetaBoot();

  return (
    <AuthFooterLinks>
      {!signupDisabled && (
        <AuthFooterLink>
          <T id={'dont_have_an_account'} />{' '}
          <Link to={'/auth/register'}>
            <T id={'sign_up'} />
          </Link>
        </AuthFooterLink>
      )}
      <AuthFooterLink>
        <T id={'return_to'} />{' '}
        <Link to={'/auth/login'}>
          <T id={'sign_in'} />
        </Link>
      </AuthFooterLink>
    </AuthFooterLinks>
  );
}
