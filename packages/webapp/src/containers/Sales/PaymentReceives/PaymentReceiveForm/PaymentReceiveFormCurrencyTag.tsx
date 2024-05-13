import { BaseCurrency, BaseCurrencyRoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { usePaymentReceiveFormContext } from './PaymentReceiveFormProvider';

/**
 * Payment reecevie form currnecy tag.
 * @returns
 */
export default function PaymentReceiveFormCurrencyTag() {
  const { isForeignCustomer, selectCustomer } = usePaymentReceiveFormContext();

  if (!isForeignCustomer) {
    return null;
  }

  return (
    <BaseCurrencyRoot>
      <BaseCurrency currency={selectCustomer?.currency_code} />
    </BaseCurrencyRoot>
  );
}
