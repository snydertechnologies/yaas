import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useActivateContact } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Customer activate alert.
 */
function CustomerActivateAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { customerId, service },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: activateContact, isLoading } = useActivateContact();

  // Handle activate constomer alert cancel.
  const handleCancelActivateCustomer = () => {
    closeAlert(name);
  };

  // Handle confirm customer activated.
  const handleConfirmCustomerActivate = () => {
    activateContact(customerId)
      .then(() => {
        AppToaster.show({
          message: intl.get('customer.alert.activated_message'),
          intent: Intent.SUCCESS,
        });
      })
      .catch((error) => {})
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'activate'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelActivateCustomer}
      loading={isLoading}
      onConfirm={handleConfirmCustomerActivate}
    >
      <p>{intl.get('customer.alert.are_you_sure_want_to_activate_this_customer')}</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(CustomerActivateAlert);
