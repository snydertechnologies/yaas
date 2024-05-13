import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { transformErrors } from '@bigcapital/webapp/containers/Customers/utils';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useDeleteCustomer } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Customer delete alert.
 */
function CustomerDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { contactId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteCustomerMutate, isLoading } = useDeleteCustomer();

  // handle cancel delete  alert.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // handle confirm delete customer.
  const handleConfirmDeleteCustomer = useCallback(() => {
    deleteCustomerMutate(contactId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_customer_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.CUSTOMER_DETAILS);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          transformErrors(errors);
        },
      )
      .finally(() => {
        closeAlert(name);
      });
  }, [deleteCustomerMutate, contactId, closeAlert, name]);

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelDeleteAlert}
      onConfirm={handleConfirmDeleteCustomer}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_customer_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(CustomerDeleteAlert);
