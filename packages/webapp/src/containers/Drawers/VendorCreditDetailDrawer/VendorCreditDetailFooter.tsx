import { CommercialDocFooter, DetailItem, DetailsMenu, If, T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { useVendorCreditDetailDrawerContext } from './VendorCreditDetailDrawerProvider';

export function VendorCreditDetailFooter() {
  const { vendorCredit } = useVendorCreditDetailDrawerContext();

  return (
    <CommercialDocFooter>
      <DetailsMenu direction={'horizantal'} minLabelSize={'150px'}>
        <If condition={vendorCredit.note}>
          <DetailItem label={<T id={'note'} />} children={vendorCredit.note} />
        </If>
      </DetailsMenu>
    </CommercialDocFooter>
  );
}
