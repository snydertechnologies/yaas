import { CurrencyTag } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

/**
 * base currecncy.
 * @returns
 */
export function BaseCurrency({ currency }) {
  return <CurrencyTag>{currency}</CurrencyTag>;
}
