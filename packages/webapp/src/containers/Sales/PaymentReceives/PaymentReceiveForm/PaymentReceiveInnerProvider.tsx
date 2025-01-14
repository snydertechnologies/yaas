import { useDueInvoices } from '@bigcapital/webapp/hooks/query';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React, { createContext, useContext, useEffect } from 'react';
import { usePaymentReceiveFormContext } from './PaymentReceiveFormProvider';
import { transformInvoicesNewPageEntries } from './utils';

const PaymentReceiveInnerContext = createContext();

/**
 * Payment receive inner form provider.
 */
function PaymentReceiveInnerProvider({ ...props }) {
  const { isNewMode } = usePaymentReceiveFormContext();

  // Formik context.
  const {
    values: { customer_id: customerId },
    setFieldValue,
  } = useFormikContext();

  // Fetches customer receivable invoices.
  const {
    data: dueInvoices,
    isLoading: isDueInvoicesLoading,
    isFetching: isDueInvoicesFetching,
  } = useDueInvoices(customerId, {
    enabled: !!customerId && isNewMode,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isDueInvoicesFetching && dueInvoices && isNewMode) {
      setFieldValue('entries', transformInvoicesNewPageEntries(dueInvoices));
    }
  }, [isDueInvoicesFetching, dueInvoices, isNewMode, setFieldValue]);

  // Provider payload.
  const provider = {
    dueInvoices,
    isDueInvoicesLoading,
    isDueInvoicesFetching,
  };

  return <PaymentReceiveInnerContext.Provider value={provider} {...props} />;
}

const usePaymentReceiveInnerContext = () => useContext(PaymentReceiveInnerContext);

export { PaymentReceiveInnerProvider, usePaymentReceiveInnerContext };
