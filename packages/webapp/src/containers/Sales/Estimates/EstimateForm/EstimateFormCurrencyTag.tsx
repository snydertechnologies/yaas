import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useEstimateFormContext } from './EstimateFormProvider';

/**
 * Estimate form currency tag.
 * @returns
 */
export default function EstimateFromCurrencyTag() {
  const { isForeignCustomer, selectCustomer } = useEstimateFormContext();

  if (!isForeignCustomer) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectCustomer?.currency_code} />
    </BaseCurrencyRoot>
  );
}
