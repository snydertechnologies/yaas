import { Card, DataTable } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { TableStyle } from '@bigcapital/webapp/constants';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import { useVendorCreditDetailDrawerContext } from '../VendorCreditDetailDrawerProvider';
import { ActionsMenu, useRefundCreditTransactionsTableColumns } from './components';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund vendor transactions table.
 */
function RefundVendorCreditTransactionsTable({
  // #withAlertsActions
  openAlert,
}) {
  const { refundVendorCredit } = useVendorCreditDetailDrawerContext();

  const columns = useRefundCreditTransactionsTableColumns();

  // Handle delete refund vendor credit.
  const handleDeleteRefundVendorCredit = ({ id }) => {
    openAlert('refund-vendor-delete', { vendorCreditId: id });
  };

  return (
    <Card>
      <DataTable
        columns={columns}
        data={refundVendorCredit}
        ContextMenu={ActionsMenu}
        styleName={TableStyle.Constrant}
        payload={{
          onDelete: handleDeleteRefundVendorCredit,
        }}
      />
    </Card>
  );
}

export default compose(withAlertsActions)(RefundVendorCreditTransactionsTable);
