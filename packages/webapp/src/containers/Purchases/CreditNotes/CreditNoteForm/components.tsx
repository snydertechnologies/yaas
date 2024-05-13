import { ExchangeRateInputGroup } from '@bigcapital/webapp/components';
import { useCurrentOrganization } from '@bigcapital/webapp/hooks/state';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useVendorNoteIsForeignCustomer } from './utils';

/**
 * vendor credit note exchange rate input field.
 * @returns {JSX.Element}
 */
export function VendorCreditNoteExchangeRateInputField({ ...props }) {
  const currentOrganization = useCurrentOrganization();
  const { values } = useFormikContext();

  const isForeignCustomer = useVendorNoteIsForeignCustomer();

  // Can't continue if the customer is not foreign.
  if (!isForeignCustomer) {
    return null;
  }
  return (
    <ExchangeRateInputGroup
      fromCurrency={values.currency_code}
      toCurrency={currentOrganization.base_currency}
      {...props}
    />
  );
}
