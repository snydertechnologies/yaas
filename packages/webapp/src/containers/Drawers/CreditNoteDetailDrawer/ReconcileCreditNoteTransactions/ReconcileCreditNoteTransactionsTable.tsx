// @ts-nocheck
import React from 'react';
import { DataTable, Card } from '@bigcapital/webapp/components';

import { TableStyle } from '@bigcapital/webapp/constants';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';

import { useCreditNoteDetailDrawerContext } from '../CreditNoteDetailDrawerProvider';
import { useReconcileCreditTransactionsTableColumns, ActionsMenu } from './components';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Reconcile credit transactions table.
 */
function RefundCreditNoteTransactionsTable({
  // #withAlertsActions
  openAlert,
}) {
  // Credit note drawer context.
  const { reconcileCreditNotes } = useCreditNoteDetailDrawerContext();

  // Reconcile credit transactions table columns.
  const columns = useReconcileCreditTransactionsTableColumns();

  // Handle delete reconile credit.
  const handleDeleteReconcileCreditNote = ({ id }) => {
    openAlert('reconcile-credit-delete', { creditNoteId: id });
  };

  return (
    <Card>
      <DataTable
        columns={columns}
        data={reconcileCreditNotes}
        ContextMenu={ActionsMenu}
        payload={{
          onDelete: handleDeleteReconcileCreditNote,
        }}
        styleName={TableStyle.Constrant}
        className={'datatable--refund-transactions'}
      />
    </Card>
  );
}

export default compose(withAlertsActions)(RefundCreditNoteTransactionsTable);
