import { AppToaster } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { useGetPlaidLinkToken } from '@bigcapital/webapp/hooks/query';
import { useSetBankingPlaidToken } from '@bigcapital/webapp/hooks/state/banking';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
// @ts-nocheck
import * as R from 'ramda';
import { ConnectBankDialogContent } from './ConnectBankDialogContent';

const initialValues: ConnectBankDialogForm = {
  serviceProvider: 'plaid',
};

interface ConnectBankDialogForm {
  serviceProvider: 'plaid';
}

function ConnectBankDialogBodyRoot({
  // #withDialogActions
  closeDialog,
}) {
  const { mutateAsync: getPlaidLinkToken } = useGetPlaidLinkToken();
  const setPlaidId = useSetBankingPlaidToken();

  // Handles the form submitting.
  const handleSubmit = (values: ConnectBankDialogForm, { setSubmitting }: FormikHelpers<ConnectBankDialogForm>) => {
    setSubmitting(true);
    getPlaidLinkToken()
      .then((res) => {
        setSubmitting(false);
        closeDialog(DialogsName.ConnectBankCreditCard);
        setPlaidId(res.data.link_token);
      })
      .catch(() => {
        setSubmitting(false);
        AppToaster.show({
          message: 'Something went wrong.',
          intent: Intent.DANGER,
        });
      });
  };

  return (
    <div className={classNames(CLASSES.DIALOG_BODY)}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <ConnectBankDialogContent />
        </Form>
      </Formik>
    </div>
  );
}

export default R.compose(withDialogActions)(ConnectBankDialogBodyRoot);
