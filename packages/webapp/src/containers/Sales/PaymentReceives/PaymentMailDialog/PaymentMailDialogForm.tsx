import { AppToaster } from '@bigcapital/webapp/components';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import {
  MailNotificationFormValues,
  initialMailNotificationValues,
  transformMailFormToInitialValues,
  transformMailFormToRequest,
} from '@bigcapital/webapp/containers/SendMailNotification/utils';
import { useSendPaymentReceiveMail } from '@bigcapital/webapp/hooks/query';
import { Intent } from '@blueprintjs/core';
// @ts-nocheck
import { Formik, FormikBag } from 'formik';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { usePaymentMailDialogBoot } from './PaymentMailDialogBoot';
import { PaymentMailDialogFormContent } from './PaymentMailDialogFormContent';

const initialFormValues = {
  ...initialMailNotificationValues,
  attachPayment: true,
};

interface PaymentMailFormValue extends MailNotificationFormValues {
  attachPayment: boolean;
}

export function PaymentMailDialogFormRoot({
  // #withDialogActions
  closeDialog,
}) {
  const { mailOptions, paymentReceiveId, redirectToPaymentsList } = usePaymentMailDialogBoot();
  const { mutateAsync: sendPaymentMail } = useSendPaymentReceiveMail();

  const history = useHistory();

  const initialValues = transformMailFormToInitialValues(mailOptions, initialFormValues);
  // Handles the form submitting.
  const handleSubmit = (values: PaymentMailFormValue, { setSubmitting }: FormikBag<PaymentMailFormValue>) => {
    const reqValues = transformMailFormToRequest(values);

    setSubmitting(true);
    sendPaymentMail([paymentReceiveId, reqValues])
      .then(() => {
        AppToaster.show({
          message: 'The mail notification has been sent successfully.',
          intent: Intent.SUCCESS,
        });
        setSubmitting(false);
        closeDialog(DialogsName.PaymentMail);

        // Redirects to payments list if the option is enabled.
        if (redirectToPaymentsList) {
          history.push('/payment-receives');
        }
      })
      .catch(() => {
        AppToaster.show({
          message: 'Something went wrong.',
          intent: Intent.DANGER,
        });
        setSubmitting(false);
        closeDialog(DialogsName.PaymentMail);
      });
  };

  const handleClose = () => {
    closeDialog(DialogsName.PaymentMail);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <PaymentMailDialogFormContent onClose={handleClose} />
    </Formik>
  );
}

export const PaymentMailDialogForm = R.compose(withDialogActions)(PaymentMailDialogFormRoot);
