import { formattedAmount } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

export function Money({ amount, currency }) {
  return <span>{formattedAmount(amount, currency)}</span>;
}
