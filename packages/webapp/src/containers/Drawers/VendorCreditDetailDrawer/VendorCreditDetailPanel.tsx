// @ts-nocheck
import React from 'react';

import { CommercialDocBox } from '@bigcapital/webapp/components';

import VendorCreditDetailDrawerFooter from './VendorCreditDetailDrawerFooter';
import { VendorCreditDetailFooter } from './VendorCreditDetailFooter';
import VendorCreditDetailHeader from './VendorCreditDetailHeader';
import VendorCreditDetailTable from './VendorCreditDetailTable';

/**
 * Vendor credit details panel.
 * @returns {React.JSX}
 */
export default function VendorCreditDetailPanel() {
  return (
    <CommercialDocBox>
      <VendorCreditDetailHeader />
      <VendorCreditDetailTable />
      <VendorCreditDetailDrawerFooter />
      <VendorCreditDetailFooter />
    </CommercialDocBox>
  );
}
