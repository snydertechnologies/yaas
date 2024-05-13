import { DetailItem } from '@bigcapital/webapp/components';
import { isEqual } from 'lodash';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * Detail exchange rate item.
 * @param {*} param0
 * @param {*} param1
 * @returns
 */
function DetailExchangeRate({
  exchangeRate,
  toCurrency,
  // #withCurrentOrganization
  organization: { base_currency },
}) {
  if (isEqual(base_currency, toCurrency)) {
    return null;
  }

  return (
    <DetailItem label={intl.get('exchange_rate')}>
      1 {base_currency} = {exchangeRate} {toCurrency}
    </DetailItem>
  );
}

export const ExchangeRateDetailItem = R.compose(withCurrentOrganization())(DetailExchangeRate);
