import { Tab } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { DrawerMainTabs } from '@bigcapital/webapp/components';
import RefundCreditNoteDetailActionsBar from './RefundCreditNoteDetailActionsBar';
import RefundCreditNoteDetailTab from './RefundCreditNoteDetailTab';

/**
 * Refund credit note detail.
 * @returns {React.JSX}
 */
export default function RefundCreditNoteDetail() {
  return (
    <RefundCreditNoteDetailRoot>
      <RefundCreditNoteDetailActionsBar />
      <RefundCreditNoteDetailTabs />
    </RefundCreditNoteDetailRoot>
  );
}

/**
 * Refund credit note detail tabs.
 * @returns {React.JSX}
 */
function RefundCreditNoteDetailTabs() {
  return (
    <DrawerMainTabs>
      <Tab title={intl.get('details')} id={'details'} panel={<RefundCreditNoteDetailTab />} />
    </DrawerMainTabs>
  );
}

const RefundCreditNoteDetailRoot = styled.div``;
