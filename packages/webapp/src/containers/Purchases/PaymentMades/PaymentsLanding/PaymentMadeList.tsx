// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/PaymentMade/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import PaymentMadeActionsBar from './PaymentMadeActionsBar';
import PaymentMadeViewTabs from './PaymentMadeViewTabs';
import { PaymentMadesListProvider } from './PaymentMadesListProvider';
import PaymentMadesTable from './PaymentMadesTable';

import withPaymentMades from './withPaymentMade';
import withPaymentMadeActions from './withPaymentMadeActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';

/**
 * Payment mades list.
 */
function PaymentMadeList({
  // #withPaymentMades
  paymentMadesTableState,
  paymentsTableStateChanged,

  // #withPaymentMadeActions
  resetPaymentMadesTableState,
}) {
  // Resets the invoices table state once the page unmount.
  React.useEffect(
    () => () => {
      resetPaymentMadesTableState();
    },
    [resetPaymentMadesTableState],
  );

  return (
    <PaymentMadesListProvider
      query={transformTableStateToQuery(paymentMadesTableState)}
      tableStateChanged={paymentsTableStateChanged}
    >
      <PaymentMadeActionsBar />

      <DashboardPageContent>
        <PaymentMadeViewTabs />
        <PaymentMadesTable />
      </DashboardPageContent>
    </PaymentMadesListProvider>
  );
}

export default compose(
  withPaymentMades(({ paymentMadesTableState, paymentsTableStateChanged }) => ({
    paymentMadesTableState,
    paymentsTableStateChanged,
  })),
  withPaymentMadeActions,
)(PaymentMadeList);
