import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useReconcileVendorCredits, useRefundVendorCredit, useVendorCredit } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const VendorCreditDetailDrawerContext = React.createContext();

/**
 * Vendor credit drawer provider.
 */
function VendorCreditDetailDrawerProvider({ vendorCreditId, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Handle fetch vendor credit details.
  const { data: vendorCredit, isLoading: isVendorCreditLoading } = useVendorCredit(vendorCreditId, {
    enabled: !!vendorCreditId,
  });

  // Handle fetch refund credit note.
  const {
    data: refundVendorCredit,
    isFetching: isRefundVendorCreditFetching,
    isLoading: isRefundVendorCreditLoading,
  } = useRefundVendorCredit(vendorCreditId, {
    enabled: !!vendorCreditId,
  });

  // Handle fetch refund credit note.
  const {
    data: reconcileVendorCredits,
    isFetching: isReconcileVendorCreditFetching,
    isLoading: isReconcileVendorCreditLoading,
  } = useReconcileVendorCredits(vendorCreditId, {
    enabled: !!vendorCreditId,
  });

  const provider = {
    vendorCredit,
    refundVendorCredit,
    reconcileVendorCredits,
    isRefundVendorCreditLoading,
    isRefundVendorCreditFetching,
    vendorCreditId,
  };

  return (
    <DrawerLoading loading={isVendorCreditLoading || isRefundVendorCreditLoading || isReconcileVendorCreditLoading}>
      <DrawerHeaderContent
        name={DRAWERS.VENDOR_CREDIT_DETAILS}
        title={intl.get('vendor_credit.drawer_vendor_credit_detail', {
          vendorNumber: vendorCredit.vendor_credit_number,
        })}
        subTitle={
          featureCan(Features.Branches)
            ? intl.get('vendor_credit.drawer.subtitle', {
                value: vendorCredit.branch?.name,
              })
            : null
        }
      />
      <VendorCreditDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useVendorCreditDetailDrawerContext = () => React.useContext(VendorCreditDetailDrawerContext);

export { VendorCreditDetailDrawerProvider, useVendorCreditDetailDrawerContext };
