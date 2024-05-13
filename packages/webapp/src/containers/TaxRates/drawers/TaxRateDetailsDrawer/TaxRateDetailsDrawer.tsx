import { Drawer, DrawerHeaderContent, DrawerSuspense } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

const TaxRateDetailsDrawerContent = React.lazy(() => import('./TaxRateDetailsContent'));

/**
 * Tax rate details drawer.
 */
function TaxRateDetailsDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { taxRateId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '650px', maxWidth: '650px' }} size={'65%'}>
      <DrawerSuspense>
        <TaxRateDetailsDrawerContent name={name} taxRateId={taxRateId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default R.compose(withDrawers())(TaxRateDetailsDrawer);
