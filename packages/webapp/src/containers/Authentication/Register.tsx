import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';

import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import AuthInsider from '@bigcapital/webapp/containers/Authentication/AuthInsider';
import { useAuthLogin, useAuthRegister } from '@bigcapital/webapp/hooks/query/authentication';

import RegisterForm from './RegisterForm';
import { AuthFooterLink, AuthFooterLinks, AuthInsiderCard } from './_components';
import { RegisterSchema, transformRegisterErrorsToForm, transformRegisterToastMessages } from './utils';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

/**
 * Register form.
 */
export default function RegisterUserForm() {
  const { mutateAsync: authLoginMutate } = useAuthLogin();
  const { mutateAsync: authRegisterMutate } = useAuthRegister();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    authRegisterMutate(values)
      .then((response) => {
        authLoginMutate({
          crediential: values.email,
          password: values.password,
        }).catch(
          ({
            response: {
              data: { errors },
            },
          }) => {
            AppToaster.show({
              message: intl.get('something_wentwrong'),
              intent: Intent.SUCCESS,
            });
          },
        );
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          const formErrors = transformRegisterErrorsToForm(errors);
          const toastMessages = transformRegisterToastMessages(errors);

          toastMessages.forEach((toastMessage) => {
            AppToaster.show(toastMessage);
          });
          setErrors(formErrors);
          setSubmitting(false);
        },
      );
  };

  return (
    <AuthInsider>
      <AuthInsiderCard>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
          component={RegisterForm}
        />
      </AuthInsiderCard>

      <RegisterFooterLinks />
    </AuthInsider>
  );
}

function RegisterFooterLinks() {
  return (
    <AuthFooterLinks>
      <AuthFooterLink>
        <T id={'return_to'} />{' '}
        <Link to={'/auth/login'}>
          <T id={'sign_in'} />
        </Link>
      </AuthFooterLink>

      <AuthFooterLink>
        <Link to={'/auth/send_reset_password'}>
          <T id={'forget_my_password'} />
        </Link>
      </AuthFooterLink>
    </AuthFooterLinks>
  );
}
