import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { ButtonLink } from '../Button';

function VendorDrawerLinkComponent({
  // #ownProps
  children,
  vendorId,
  className,

  // #withDrawerActions
  openDrawer,
}) {
  // Handle view customer drawer.
  const handleVendorDrawer = (event) => {
    openDrawer(DRAWERS.VENDOR_DETAILS, { vendorId });
    event.preventDefault();
  };

  return (
    <ButtonLink className={className} onClick={handleVendorDrawer}>
      {children}
    </ButtonLink>
  );
}

export const VendorDrawerLink = R.compose(withDrawerActions)(VendorDrawerLinkComponent);
