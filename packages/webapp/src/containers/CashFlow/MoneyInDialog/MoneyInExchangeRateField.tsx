import { ExchangeRateMutedField } from '@bigcapital/webapp/components';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useMoneyInFieldsContext } from './MoneyInFieldsProvider';
import { useForeignAccount } from './utils';

export function MoneyInExchangeRateField() {
  const { account } = useMoneyInFieldsContext();
  const { values } = useFormikContext();

  const isForeigAccount = useForeignAccount();

  if (!isForeigAccount) return null;

  return (
    <ExchangeRateMutedField
      name={'exchange_rate'}
      fromCurrency={values.currency_code}
      toCurrency={account.currency_code}
      formGroupProps={{ label: '', inline: false }}
      date={values.date}
      exchangeRate={values.exchange_rate}
    />
  );
}
