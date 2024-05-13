import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useDeleteRefundCreditNote } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund credit transactions delete alert
 */
function RefundCreditNoteDeleteAlert({
  name,
  // #withAlertStoreConnect
  isOpen,
  payload: { creditNoteId },
  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteRefundCreditMutate, isLoading } = useDeleteRefundCreditNote();

  // Handle cancel delete.
  const handleCancelAlert = () => {
    closeAlert(name);
  };

  // Handle confirm delete .
  const handleConfirmRefundCreditDelete = () => {
    deleteRefundCreditMutate(creditNoteId)
      .then(() => {
        AppToaster.show({
          message: intl.get('refund_credit_transactions.alert.delete_message'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.REFUND_CREDIT_NOTE_DETAILS);
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
      onConfirm={handleConfirmRefundCreditDelete}
      loading={isLoading}
    >
      <p>
        <T id={`refund_credit_transactions.once_your_delete_this_refund_credit_note`} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(RefundCreditNoteDeleteAlert);
