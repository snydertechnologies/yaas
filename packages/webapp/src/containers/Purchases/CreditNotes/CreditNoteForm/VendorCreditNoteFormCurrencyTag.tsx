import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useVendorCreditNoteFormContext } from './VendorCreditNoteFormProvider';

/**
 * Vendor credit note currency tag.
 * @returns
 */
export default function VendorCreditNoteFormCurrencyTag() {
  const { isForeignVendor, selectVendor } = useVendorCreditNoteFormContext();

  if (!isForeignVendor) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectVendor?.currency_code} />
    </BaseCurrencyRoot>
  );
}
