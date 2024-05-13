import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useReceiptFormContext } from './ReceiptFormProvider';

/**
 * Receipt form currency tag.
 * @returns
 */
export default function ReceiptFormCurrencyTag() {
  const { isForeignCustomer, selectCustomer } = useReceiptFormContext();

  if (!isForeignCustomer) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectCustomer?.currency_code} />
    </BaseCurrencyRoot>
  );
}
