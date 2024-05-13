import clsx from 'classnames';
// @ts-nocheck
import React from 'react';

import { Card } from '@bigcapital/webapp/components';

import VendorDetailsActionsBar from './VendorDetailsActionsBar';
import VendorDetailsHeader from './VendorDetailsHeader';

import Style from './VendorDetailsDrawer.module.scss';

/**
 * contact detail.
 */
export default function CustomerDetails() {
  return (
    <div className={clsx(Style.root)}>
      <VendorDetailsActionsBar />

      <Card>
        <VendorDetailsHeader />
      </Card>
    </div>
  );
}
