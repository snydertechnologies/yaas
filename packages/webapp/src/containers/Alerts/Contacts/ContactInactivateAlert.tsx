import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useInactivateContact } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Contact inactivate alert.
 */
function ContactInactivateAlert({
  name,
  // #withAlertStoreConnect
  isOpen,
  payload: { contactId, service },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: inactivateContact, isLoading } = useInactivateContact();

  // Handle cancel inactivate alert.
  const handleCancelInactivateContact = () => {
    closeAlert(name);
  };

  // Handle confirm contact Inactive.
  const handleConfirmContactInactive = () => {
    inactivateContact(contactId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_contact_has_been_inactivated_successfully'),
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
      confirmButtonText={<T id={'inactivate'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelInactivateContact}
      onConfirm={handleConfirmContactInactive}
      loading={isLoading}
    >
      <p>
        {intl.get('are_sure_to_inactive_this_contact', {
          name: service,
        })}
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ContactInactivateAlert);
