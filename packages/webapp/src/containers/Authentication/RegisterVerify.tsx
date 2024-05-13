import { AppToaster, Stack } from '@bigcapital/webapp/components';
import { useAuthSignUpVerifyResendMail } from '@bigcapital/webapp/hooks/query';
import { useAuthActions } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import { Button, Intent } from '@blueprintjs/core';
import { AuthContainer } from './AuthContainer';
import AuthInsider from './AuthInsider';
import styles from './RegisterVerify.module.scss';
import { AuthInsiderCard } from './_components';

export default function RegisterVerify() {
  const { setLogout } = useAuthActions();
  const { mutateAsync: resendSignUpVerifyMail, isLoading } = useAuthSignUpVerifyResendMail();

  const handleResendMailBtnClick = () => {
    resendSignUpVerifyMail()
      .then(() => {
        AppToaster.show({
          intent: Intent.SUCCESS,
          message: 'The verification mail has sent successfully.',
        });
      })
      .catch(() => {
        AppToaster.show({
          intent: Intent.DANGER,
          message: 'Something went wrong.',
        });
      });
  };
  const handleSignOutBtnClick = () => {
    setLogout();
  };

  return (
    <AuthContainer>
      <AuthInsider>
        <AuthInsiderCard className={styles.root}>
          <h2 className={styles.title}>Please verify your email</h2>
          <p className={styles.description}>
            We sent an email to <strong>asdahmed@gmail.com</strong> Click the link inside to get started.
          </p>

          <Stack spacing={4}>
            <Button large fill loading={isLoading} intent={Intent.NONE} onClick={handleResendMailBtnClick}>
              Resend email
            </Button>

            <Button large fill minimal intent={Intent.DANGER} onClick={handleSignOutBtnClick}>
              Not my email
            </Button>
          </Stack>
        </AuthInsiderCard>
      </AuthInsider>
    </AuthContainer>
  );
}
