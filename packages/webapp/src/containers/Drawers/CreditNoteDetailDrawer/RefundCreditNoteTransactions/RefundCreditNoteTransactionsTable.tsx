// @ts-nocheck
import React from 'react';
import { DataTable, Card } from '@bigcapital/webapp/components';

import { TableStyle } from '@bigcapital/webapp/constants';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';

import { useCreditNoteDetailDrawerContext } from '../CreditNoteDetailDrawerProvider';
import { useRefundCreditTransactionsTableColumns, ActionsMenu } from './components';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund credit note transactions table.
 */
function RefundCreditNoteTransactionsTable({
  // #withAlertsActions
  openAlert,
}) {
  const { refundCreditNote } = useCreditNoteDetailDrawerContext();

  // Refund credit transactions table columns.
  const columns = useRefundCreditTransactionsTableColumns();

  // Handle delete refund credit.
  const handleDeleteRefundCreditNote = ({ id }) => {
    openAlert('refund-credit-delete', { creditNoteId: id });
  };

  return (
    <Card>
      <DataTable
        columns={columns}
        data={refundCreditNote}
        ContextMenu={ActionsMenu}
        styleName={TableStyle.Constrant}
        payload={{
          onDelete: handleDeleteRefundCreditNote,
        }}
      />
    </Card>
  );
}

export default compose(withAlertsActions)(RefundCreditNoteTransactionsTable);
