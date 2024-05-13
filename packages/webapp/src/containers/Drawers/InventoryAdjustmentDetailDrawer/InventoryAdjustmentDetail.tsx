import { Tab } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { DrawerMainTabs } from '@bigcapital/webapp/components';
import InventoryAdjustmentDetailActionsBar from './InventoryAdjustmentDetailActionsBar';
import InventoryAdjustmentDetailGLEntriesPanel from './InventoryAdjustmentDetailGLEntriesPanel';
import InventoryAdjustmentDetailTab from './InventoryAdjustmentDetailTab';

/**
 * Inventory adjustment detail
 * @returns {React.JSX}
 */
export default function InventoryAdjustmentDetail() {
  return (
    <InventoryAdjustmentDetailsRoot>
      <InventoryAdjustmentDetailActionsBar />
      <InventoryAdjustmentDetailTabs />
    </InventoryAdjustmentDetailsRoot>
  );
}

/**
 * Invenoty adjustment details tabs.
 * @returns {React.JSX}
 */
function InventoryAdjustmentDetailTabs() {
  return (
    <DrawerMainTabs renderActiveTabPanelOnly={true} defaultSelectedTabId="details">
      <Tab title={intl.get('details')} id={'details'} panel={<InventoryAdjustmentDetailTab />} />
      <Tab
        title={intl.get('journal_entries')}
        id={'journal_entries'}
        panel={<InventoryAdjustmentDetailGLEntriesPanel />}
      />
    </DrawerMainTabs>
  );
}

const InventoryAdjustmentDetailsRoot = styled.div``;
