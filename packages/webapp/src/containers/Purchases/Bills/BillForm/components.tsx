import { ExchangeRateInputGroup } from '@bigcapital/webapp/components';
import { useCurrentOrganization } from '@bigcapital/webapp/hooks/state';
import { Button } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useBillIsForeignCustomer } from './utils';

/**
 * bill exchange rate input field.
 * @returns {JSX.Element}
 */
export function BillExchangeRateInputField({ ...props }) {
  const currentOrganization = useCurrentOrganization();
  const { values } = useFormikContext();

  const isForeignCustomer = useBillIsForeignCustomer();

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

/**
 * bill project select.
 * @returns {JSX.Element}
 */
export function BillProjectSelectButton({ label }) {
  return <Button text={label ?? intl.get('select_project')} />;
}
