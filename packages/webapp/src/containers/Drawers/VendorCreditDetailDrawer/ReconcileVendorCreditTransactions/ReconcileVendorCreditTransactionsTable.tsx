import { Card, DataTable } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { TableStyle } from '@bigcapital/webapp/constants';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';

import { compose } from '@bigcapital/webapp/utils';
import { useVendorCreditDetailDrawerContext } from '../VendorCreditDetailDrawerProvider';
import { ActionsMenu, useReconcileVendorCreditTransactionsTableColumns } from './components';

/**
 * Reconcile vendor credit transactions table.
 */
function ReconcileVendorCreditTransactionsTable({
  // #withAlertsActions
  openAlert,
}) {
  const columns = useReconcileVendorCreditTransactionsTableColumns();

  const { reconcileVendorCredits } = useVendorCreditDetailDrawerContext();

  // Handle delete reconile credit.
  const handleDeleteReconcileVendorCredit = ({ id }) => {
    openAlert('reconcile-vendor-delete', { vendorCreditId: id });
  };

  return (
    <Card>
      <DataTable
        columns={columns}
        data={reconcileVendorCredits}
        ContextMenu={ActionsMenu}
        styleName={TableStyle.Constrant}
        payload={{
          onDelete: handleDeleteReconcileVendorCredit,
        }}
      />
    </Card>
  );
}

export default compose(withAlertsActions)(ReconcileVendorCreditTransactionsTable);
