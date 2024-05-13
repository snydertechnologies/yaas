import { formattedAmount } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

export function FormatNumber({ value, currency = '', noZero }) {
  return formattedAmount(value, currency, { noZero });
}

export function FormatNumberCell({ value, column: { formatNumber } }) {
  return <FormatNumber value={value} {...formatNumber} />;
}
