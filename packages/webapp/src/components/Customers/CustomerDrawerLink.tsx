import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { ButtonLink } from '../Button';

function CustomerDrawerLinkComponent({
  // #ownProps
  children,
  customerId,
  className,

  // #withDrawerActions
  openDrawer,
}) {
  // Handle view customer drawer.
  const handleCustomerDrawer = (event) => {
    openDrawer(DRAWERS.CUSTOMER_DETAILS, { customerId });
    event.preventDefault();
  };

  return (
    <ButtonLink className={className} onClick={handleCustomerDrawer}>
      {children}
    </ButtonLink>
  );
}

export const CustomerDrawerLink = R.compose(withDrawerActions)(CustomerDrawerLinkComponent);
