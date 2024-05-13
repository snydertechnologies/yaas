import { Tab } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { DrawerMainTabs } from '@bigcapital/webapp/components';
import RefundVendorCreditDetailActionsBar from './RefundVendorCreditDetailActionsBar';
import RefundVendorCreditDetailTab from './RefundVendorCreditDetailTab';

/**
 * Refund vendor credit detail.
 * @returns {React.JSX}
 */
export default function RefundVendorCreditDetail() {
  return (
    <RefundVendorCreditDetailRoot>
      <RefundVendorCreditDetailActionsBar />
      <RefundVendorCreditDetailTabs />
    </RefundVendorCreditDetailRoot>
  );
}

/**
 * Refund vendor credit detail tabs.
 * @returns {React.JSX}
 */
function RefundVendorCreditDetailTabs() {
  return (
    <DrawerMainTabs>
      <Tab title={intl.get('details')} id={'details'} panel={<RefundVendorCreditDetailTab />} />
    </DrawerMainTabs>
  );
}

const RefundVendorCreditDetailRoot = styled.div``;
