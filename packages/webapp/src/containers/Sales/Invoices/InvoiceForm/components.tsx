import { ExchangeRateInputGroup } from '@bigcapital/webapp/components';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import {
  useSyncExRateToForm,
  withExchangeRateFetchingLoading,
  withExchangeRateItemEntriesPriceRecalc,
} from '@bigcapital/webapp/containers/Entries/withExRateItemEntriesPriceRecalc';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useUpdateEffect } from '@bigcapital/webapp/hooks';
import { useCurrentOrganization } from '@bigcapital/webapp/hooks/state';
import { transactionNumber } from '@bigcapital/webapp/utils';
import { Button } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import { useRef } from 'react';
import intl from 'react-intl-universal';
import { useInvoiceIsForeignCustomer, useInvoiceTotal } from './utils';

/**
 * Invoice exchange rate input field.
 * @returns {JSX.Element}
 */
const InvoiceExchangeRateInputFieldRoot = ({ ...props }) => {
  const currentOrganization = useCurrentOrganization();
  const { values } = useFormikContext();
  const isForeignCustomer = useInvoiceIsForeignCustomer();

  // Can't continue if the customer is not foreign.
  if (!isForeignCustomer) {
    return null;
  }
  return (
    <ExchangeRateInputGroup
      name={'exchange_rate'}
      fromCurrency={values.currency_code}
      toCurrency={currentOrganization.base_currency}
      formGroupProps={{ label: ' ', inline: true }}
      withPopoverRecalcConfirm
      {...props}
    />
  );
};

/**
 * Invoice exchange rate input field.
 * @returns {JSX.Element}
 */
export const InvoiceExchangeRateInputField = R.compose(
  withExchangeRateFetchingLoading,
  withExchangeRateItemEntriesPriceRecalc,
)(InvoiceExchangeRateInputFieldRoot);

/**
 * Invoice project select.
 * @returns {JSX.Element}
 */
export function InvoiceProjectSelectButton({ label }) {
  return <Button text={label ?? intl.get('select_project')} />;
}

/**
 * Syncs invoice auto-increment settings to invoice form once update.
 */
export const InvoiceNoSyncSettingsToForm = R.compose(
  withSettings(({ invoiceSettings }) => ({
    invoiceAutoIncrement: invoiceSettings?.autoIncrement,
    invoiceNextNumber: invoiceSettings?.nextNumber,
    invoiceNumberPrefix: invoiceSettings?.numberPrefix,
  })),
)(({ invoiceAutoIncrement, invoiceNextNumber, invoiceNumberPrefix }) => {
  const { setFieldValue } = useFormikContext();

  useUpdateEffect(() => {
    // Do not update if the invoice auto-increment mode is disabled.
    if (!invoiceAutoIncrement) return null;

    setFieldValue('invoice_no', transactionNumber(invoiceNumberPrefix, invoiceNextNumber));
  }, [setFieldValue, invoiceNumberPrefix, invoiceNextNumber]);

  return null;
});

/**
 * Syncs the realtime exchange rate to the invoice form and shows up popup to the user
 * as an indication the entries rates have been re-calculated.
 * @returns {React.ReactNode}
 */
export const InvoiceExchangeRateSync = R.compose(withDialogActions)(({ openDialog }) => {
  const total = useInvoiceTotal();
  const timeout = useRef();

  useSyncExRateToForm({
    onSynced: () => {
      // If the total bigger then zero show alert to the user after adjusting entries.
      if (total > 0) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          openDialog(DialogsName.InvoiceExchangeRateChangeNotice);
        }, 500);
      }
    },
  });
  return null;
});
