// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/SaleInvoice/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import { InvoicesListProvider } from './InvoicesListProvider';

import InvoiceViewTabs from './InvoiceViewTabs';
import InvoicesActionsBar from './InvoicesActionsBar';
import InvoicesDataTable from './InvoicesDataTable';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withInvoiceActions from './withInvoiceActions';
import withInvoices from './withInvoices';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';

/**
 * Sale invoices list.
 */
function InvoicesList({
  // #withInvoice
  invoicesTableState,
  invoicesTableStateChanged,

  // #withInvoicesActions
  resetInvoicesTableState,
}) {
  // Resets the invoices table state once the page unmount.
  React.useEffect(
    () => () => {
      resetInvoicesTableState();
    },
    [resetInvoicesTableState],
  );

  return (
    <InvoicesListProvider
      query={transformTableStateToQuery(invoicesTableState)}
      tableStateChanged={invoicesTableStateChanged}
    >
      <InvoicesActionsBar />

      <DashboardPageContent>
        <InvoiceViewTabs />
        <InvoicesDataTable />
      </DashboardPageContent>
    </InvoicesListProvider>
  );
}

export default compose(
  withInvoices(({ invoicesTableState, invoicesTableStateChanged }) => ({
    invoicesTableState,
    invoicesTableStateChanged,
  })),
  withInvoiceActions,
  withAlertsActions,
)(InvoicesList);
