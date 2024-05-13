import { isEmpty } from 'lodash';
// @ts-nocheck
import React, { createContext } from 'react';

import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import { usePaymentReceives, useResourceMeta, useResourceViews } from '@bigcapital/webapp/hooks/query';
import { getFieldsFromResourceMeta } from '@bigcapital/webapp/utils';

const PaymentReceivesListContext = createContext();

/**
 * Payment receives data provider.
 */
function PaymentReceivesListProvider({ query, tableStateChanged, ...props }) {
  // Fetch accounts resource views and fields.
  const { data: paymentReceivesViews, isFetching: isViewsLoading } = useResourceViews('payment_receives');

  // Fetch the accounts resource fields.
  const {
    data: resourceMeta,
    isFetching: isResourceFetching,
    isLoading: isResourceLoading,
  } = useResourceMeta('payment_receives');

  // Fetch accounts list according to the given custom view id.
  const {
    data: { paymentReceives, pagination, filterMeta },
    isLoading: isPaymentReceivesLoading,
    isFetching: isPaymentReceivesFetching,
  } = usePaymentReceives(query, { keepPreviousData: true });

  // Detarmines the datatable empty status.
  const isEmptyStatus = !isPaymentReceivesLoading && !tableStateChanged && isEmpty(paymentReceives);

  // Provider payload.
  const provider = {
    paymentReceives,
    paymentReceivesViews,
    pagination,
    resourceMeta,

    fields: getFieldsFromResourceMeta(resourceMeta.fields),

    isEmptyStatus,
    isViewsLoading,
    isResourceFetching,
    isResourceLoading,
    isPaymentReceivesLoading,
    isPaymentReceivesFetching,
  };

  return (
    <DashboardInsider loading={isViewsLoading || isResourceLoading} name={'payment_receives'}>
      <PaymentReceivesListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const usePaymentReceivesListContext = () => React.useContext(PaymentReceivesListContext);

export { PaymentReceivesListProvider, usePaymentReceivesListContext };
