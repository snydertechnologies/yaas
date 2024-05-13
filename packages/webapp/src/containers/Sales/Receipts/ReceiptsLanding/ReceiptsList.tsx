import { DashboardPageContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/SaleReceipt/List.scss';

import ReceiptActionsBar from './ReceiptActionsBar';
import ReceiptViewTabs from './ReceiptViewTabs';
import ReceiptsTable from './ReceiptsTable';

import withReceipts from './withReceipts';
import withReceiptsActions from './withReceiptsActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { ReceiptsListProvider } from './ReceiptsListProvider';

/**
 * Receipts list page.
 */
function ReceiptsList({
  // #withReceipts
  receiptTableState,
  receiptsTableStateChanged,

  // #withReceiptsActions
  resetReceiptsTableState,
}) {
  // Resets the receipts table state once the page unmount.
  React.useEffect(
    () => () => {
      resetReceiptsTableState();
    },
    [resetReceiptsTableState],
  );

  return (
    <ReceiptsListProvider
      query={transformTableStateToQuery(receiptTableState)}
      tableStateChanged={receiptsTableStateChanged}
    >
      <DashboardPageContent>
        <ReceiptActionsBar />

        <DashboardPageContent>
          <ReceiptViewTabs />
          <ReceiptsTable />
        </DashboardPageContent>
      </DashboardPageContent>
    </ReceiptsListProvider>
  );
}

export default compose(
  withReceipts(({ receiptTableState, receiptsTableStateChanged }) => ({
    receiptTableState,
    receiptsTableStateChanged,
  })),
  withReceiptsActions,
)(ReceiptsList);
