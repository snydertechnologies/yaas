import clsx from 'classnames';
// @ts-nocheck
import React from 'react';

import { Card } from '@bigcapital/webapp/components';

import CustomerDetailsActionsBar from './CustomerDetailsActionsBar';
import CustomerDetailsHeader from './CustomerDetailsHeader';

import Style from './CustomerDetailsDrawer.module.scss';

/**
 * contact detail.
 */
export default function CustomerDetails() {
  return (
    <div className={clsx(Style.root)}>
      <CustomerDetailsActionsBar />

      <Card>
        <CustomerDetailsHeader />
      </Card>
    </div>
  );
}
