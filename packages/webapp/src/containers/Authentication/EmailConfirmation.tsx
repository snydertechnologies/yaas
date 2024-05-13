import { AppToaster } from '@bigcapital/webapp/components';
import { useAuthSignUpVerify } from '@bigcapital/webapp/hooks/query';
import { Intent } from '@blueprintjs/core';
// @ts-nocheck
import { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function EmailConfirmation() {
  const { mutateAsync: authSignupVerify } = useAuthSignUpVerify();
  const history = useHistory();
  const query = useQuery();

  const token = query.get('token');
  const email = query.get('email');

  useEffect(() => {
    if (!token || !email) {
      history.push('/auth/login');
    }
  }, [history, token, email]);

  useEffect(() => {
    authSignupVerify({ token, email })
      .then(() => {
        AppToaster.show({
          message: 'Your email has been verified, Congrats!',
          intent: Intent.SUCCESS,
        });
        history.push('/');
      })
      .catch(() => {
        AppToaster.show({
          message: 'Something went wrong',
          intent: Intent.DANGER,
        });
        history.push('/');
      });
  }, [token, email, authSignupVerify, history]);

  return null;
}
