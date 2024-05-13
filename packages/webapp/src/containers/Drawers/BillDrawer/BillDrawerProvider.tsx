// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { useBill, useBillLocatedLandedCost } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Features } from '@bigcapital/webapp/constants';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';

const BillDrawerContext = React.createContext();

/**
 * Bill drawer provider.
 */
function BillDrawerProvider({ billId, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Handle fetch bill details.
  const { isLoading: isBillLoading, data: bill } = useBill(billId, {
    enabled: !!billId,
  });

  // Handle fetch bill located landed cost transaction.
  const { isLoading: isLandedCostLoading, data: transactions } = useBillLocatedLandedCost(billId, {
    enabled: !!billId,
  });

  //provider.
  const provider = {
    billId,
    transactions,
    bill,
  };

  const loading = isLandedCostLoading || isBillLoading;

  return (
    <DrawerLoading loading={loading}>
      <DrawerHeaderContent
        name={DRAWERS.BILL_DETAILS}
        title={intl.get('bill.drawer.title', {
          number: bill.bill_number ? `(${bill.bill_number})` : null,
        })}
        subTitle={
          featureCan(Features.Branches)
            ? intl.get('bill.drawer.subtitle', {
                value: bill.branch?.name,
              })
            : null
        }
      />
      <BillDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useBillDrawerContext = () => React.useContext(BillDrawerContext);

export { BillDrawerProvider, useBillDrawerContext };
