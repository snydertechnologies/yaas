import { DrawerBody, DrawerHeaderContent } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
// @ts-nocheck
import React from 'react';
import TaxRateDetailsContentActionsBar from './TaxRateDetailsContentActionsBar';
import { TaxRateDetailsContentBoot } from './TaxRateDetailsContentBoot';
import TaxRateDetailsContentDetails from './TaxRateDetailsContentDetails';

interface TaxRateDetailsContentProps {
  taxRateid: number;
}

export default function TaxRateDetailsContent({ taxRateId }: TaxRateDetailsContentProps) {
  return (
    <TaxRateDetailsContentBoot taxRateId={taxRateId}>
      <DrawerHeaderContent name={DRAWERS.TAX_RATE_DETAILS} title={'Tax Rate Details'} />
      <TaxRateDetailsContentActionsBar />

      <DrawerBody>
        <TaxRateDetailsContentDetails />
      </DrawerBody>
    </TaxRateDetailsContentBoot>
  );
}
