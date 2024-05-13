import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useBillFormContext } from './BillFormProvider';

/**
 * Bill form currnecy tag.
 * @returns
 */
export default function BillFormCurrencyTag() {
  const { isForeignVendor, selectVendor } = useBillFormContext();

  if (!isForeignVendor) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectVendor?.currency_code} />
    </BaseCurrencyRoot>
  );
}
