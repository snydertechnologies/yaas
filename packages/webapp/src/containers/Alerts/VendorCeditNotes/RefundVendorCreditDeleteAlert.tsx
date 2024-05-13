import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useDeleteRefundVendorCredit } from '@bigcapital/webapp/hooks/query';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund Vendor transactions delete alert.
 */
function RefundVendorCreditDeleteAlert({
  name,
  // #withAlertStoreConnect
  isOpen,
  payload: { vendorCreditId },
  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteRefundVendorCreditMutate, isLoading } = useDeleteRefundVendorCredit();

  // Handle cancel delete.
  const handleCancelAlert = () => {
    closeAlert(name);
  };

  // Handle confirm delete .
  const handleConfirmRefundVendorCreditDelete = () => {
    deleteRefundVendorCreditMutate(vendorCreditId)
      .then(() => {
        AppToaster.show({
          message: intl.get('refund_vendor_credit_transactions.alert.delete_message'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.REFUND_VENDOR_CREDIT_DETAILS);
      })
      .catch(() => {})
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelAlert}
      onConfirm={handleConfirmRefundVendorCreditDelete}
      loading={isLoading}
    >
      <p>
        <T id={`refund_vendor_credit_transactions.once_your_delete_this_refund_vendor_credit`} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(RefundVendorCreditDeleteAlert);
