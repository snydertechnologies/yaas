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
 *  Contact activate alert.
 */
function ContactActivateAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { contactId, service },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: activateContact, isLoading } = useActivateContact();

  // Handle activate contact alert cancel.
  const handleCancelActivateContact = () => {
    closeAlert(name);
  };

  // Handle confirm contact activated.
  const handleConfirmContactActivate = () => {
    activateContact(contactId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_contact_has_been_activated_successfully'),
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
      onCancel={handleCancelActivateContact}
      loading={isLoading}
      onConfirm={handleConfirmContactActivate}
    >
      <p>{intl.get('are_sure_to_activate_this_contact')}</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ContactActivateAlert);
