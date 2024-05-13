import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import withReceipts from './withReceipts';
import withReceiptActions from './withReceiptsActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';
import { useReceiptsListContext } from './ReceiptsListProvider';

/**
 * Receipts views tabs.
 */
function ReceiptViewTabs({
  // #withReceiptActions
  setReceiptsTableState,

  // #withReceipts
  receiptsCurrentView,
}) {
  // Receipts list context.
  const { receiptsViews } = useReceiptsListContext();

  const tabs = transfromViewsToTabs(receiptsViews);

  // Handles the active tab chaning.
  const handleTabsChange = (viewSlug) => {
    setReceiptsTableState({
      viewSlug: viewSlug || null,
    });
  };

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={receiptsCurrentView}
          tabs={tabs}
          resourceName={'receipts'}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withReceiptActions,
  withReceipts(({ receiptTableState }) => ({
    receiptsCurrentView: receiptTableState.viewSlug,
  })),
)(ReceiptViewTabs);
