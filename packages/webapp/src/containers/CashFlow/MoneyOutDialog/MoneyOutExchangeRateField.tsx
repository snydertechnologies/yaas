import { ExchangeRateMutedField } from '@bigcapital/webapp/components';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useMoneyOutFieldsContext } from './MoneyOutFieldsProvider';
import { useForeignAccount } from './utils';

/**
 * Money-out exchange rate field.
 * @returns {JSX.Element}
 */
export function MoneyOutExchangeRateField() {
  const { values } = useFormikContext();

  const { account } = useMoneyOutFieldsContext();
  const isForeigAccount = useForeignAccount();

  // Cannot continue if the account is not foreign account.
  if (!isForeigAccount) return null;

  return (
    <ExchangeRateMutedField
      name={'exchange_rate'}
      fromCurrency={values?.currency_code}
      toCurrency={account?.currency_code}
      formGroupProps={{ label: '', inline: false }}
      date={values.date}
      exchangeRate={values.exchange_rate}
    />
  );
}
