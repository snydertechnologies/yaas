// @ts-nocheck
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import PaymentMadeViewTabs from './PaymentMadeViewTabs';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Payment mades view page.
 */
function PaymentMadesViewPage({
  // #withAlertActions
  openAlert,
}) {
  return (
    <Switch>
      <Route exact={true} path={['/payment-mades/:custom_view_id/custom_view', '/payment-mades']}>
        {/* <PaymentMadeDataTable
              onDeletePaymentMade={handleDeletePaymentMade}
              onEditPaymentMade={handleEditPaymentMade}
              onSelectedRowsChange={handleSelectedRowsChange}
            /> */}
      </Route>
    </Switch>
  );
}

export default compose(withAlertsActions, withDialogActions)(PaymentMadesViewPage);
