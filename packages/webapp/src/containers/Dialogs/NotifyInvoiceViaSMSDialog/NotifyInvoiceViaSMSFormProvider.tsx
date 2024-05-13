import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateNotifyInvoiceBySMS, useInvoiceSMSDetail } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const NotifyInvoiceViaSMSContext = React.createContext();

/**
 * Invoice SMS notification provider.
 */
function NotifyInvoiceViaSMSFormProvider({ invoiceId, dialogName, ...props }) {
  const [notificationType, setNotificationType] = React.useState('details');

  // Retrieve the invoice sms notification message details.
  const { data: invoiceSMSDetail, isLoading: isInvoiceSMSDetailLoading } = useInvoiceSMSDetail(
    invoiceId,
    {
      notification_key: notificationType,
    },
    {
      enabled: !!invoiceId,
      keepPreviousData: true,
    },
  );
  // Create notfiy invoice by sms mutations.
  const { mutateAsync: createNotifyInvoiceBySMSMutate } = useCreateNotifyInvoiceBySMS();

  // State provider.
  const provider = {
    invoiceId,
    invoiceSMSDetail,
    dialogName,
    createNotifyInvoiceBySMSMutate,

    notificationType,
    setNotificationType,
  };

  return (
    <DialogContent isLoading={isInvoiceSMSDetailLoading}>
      <NotifyInvoiceViaSMSContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useNotifyInvoiceViaSMSContext = () => React.useContext(NotifyInvoiceViaSMSContext);

export { NotifyInvoiceViaSMSFormProvider, useNotifyInvoiceViaSMSContext };
