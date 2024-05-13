import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Tab, Tabs } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import VendorFinanicalPanelTab from './VendorFinanicalPanelTab';

import CustomerAddressTabs from '@bigcapital/webapp/containers/Customers/CustomerForm/CustomerAddressTabs';
import CustomerNotePanel from '@bigcapital/webapp/containers/Customers/CustomerForm/CustomerNotePanel';

/**
 * Vendor form tabs.
 */
export default function VendorTabs() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_TABS)}>
      <Tabs animate={true} id={'vendor-tabs'} large={true} defaultSelectedTabId="financial">
        <Tab id={'financial'} title={intl.get('financial_details')} panel={<VendorFinanicalPanelTab />} />
        <Tab id={'address'} title={intl.get('address')} panel={<CustomerAddressTabs />} />
        <Tab id="notes" title={intl.get('notes')} panel={<CustomerNotePanel />} />
      </Tabs>
    </div>
  );
}
