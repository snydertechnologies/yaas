// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { DataTable, TableSkeletonRows } from '@bigcapital/webapp/components';

import { useItemAssociatedInvoiceTransactions } from '@bigcapital/webapp/hooks/query';
import { useItemDetailDrawerContext } from '../../ItemDetailDrawerProvider';
import { useInvoicePaymentTransactionsColumns, ActionsMenu } from './components';
import { TableStyle } from '@bigcapital/webapp/constants';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { compose } from '@bigcapital/webapp/utils';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';

/**
 * Invoice payment transactions.
 */
function InvoicePaymentTransactions({
  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const history = useHistory();

  const columns = useInvoicePaymentTransactionsColumns();

  const { itemId } = useItemDetailDrawerContext();

  // Handle fetch invoice associated transactions.
  const {
    isLoading: isInvoiceTransactionsLoading,
    isFetching: isInvoiceTransactionFetching,
    data: paymentTransactions,
  } = useItemAssociatedInvoiceTransactions(itemId, {
    enabled: !!itemId,
  });

  // Handles delete payment transactions.
  const handleDeletePaymentTransactons = ({ invoice_id }) => {
    openAlert('invoice-delete', {
      invoiceId: invoice_id,
    });
  };

  // Handles edit payment transactions.
  const handleEditPaymentTransactions = ({ invoice_id }) => {
    history.push(`/invoices/${invoice_id}/edit`);
    closeDrawer(DRAWERS.ITEM_DETAILS);
  };
  return (
    <DataTable
      columns={columns}
      data={paymentTransactions}
      loading={isInvoiceTransactionsLoading}
      headerLoading={isInvoiceTransactionsLoading}
      progressBarLoading={isInvoiceTransactionFetching}
      ContextMenu={ActionsMenu}
      payload={{
        onEdit: handleEditPaymentTransactions,
        onDelete: handleDeletePaymentTransactons,
      }}
      styleName={TableStyle.Constrant}
      TableLoadingRenderer={TableSkeletonRows}
      sticky={true}
    />
  );
}

export default compose(withAlertsActions, withDrawerActions)(InvoicePaymentTransactions);
