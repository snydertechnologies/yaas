import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { handleDeleteErrors } from '@bigcapital/webapp/containers/Purchases/Bills/BillForm/utils';
import { useDeleteBill } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Bill delete alert.
 */
function BillDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { billId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { isLoading, mutateAsync: deleteBillMutate } = useDeleteBill();

  // Handle cancel Bill
  const handleCancel = () => {
    closeAlert(name);
  };

  // Handle confirm delete invoice
  const handleConfirmBillDelete = () => {
    deleteBillMutate(billId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_bill_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.BILL_DETAILS);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          handleDeleteErrors(errors);
        },
      )
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon={'trash'}
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirmBillDelete}
      loading={isLoading}
    >
      <p>
        <T id={'once_delete_this_bill_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(BillDeleteAlert);
