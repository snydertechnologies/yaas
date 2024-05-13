import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useCreditNoteFormContext } from './CreditNoteFormProvider';

/**
 * Credit note from currency tag.
 * @returns
 */
export default function CreditNotetFormCurrencyTag() {
  const { isForeignCustomer, selectCustomer } = useCreditNoteFormContext();

  if (!isForeignCustomer) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectCustomer?.currency_code} />
    </BaseCurrencyRoot>
  );
}
