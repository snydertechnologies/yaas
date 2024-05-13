import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose, saveInvoke } from '@bigcapital/webapp/utils';

/**
 * Items entries table clear all lines alert.
 */
function ItemsEntriesDeleteAlert({
  name,
  onConfirm,

  // #withAlertStoreConnect
  isOpen,
  payload: {},

  // #withAlertActions
  closeAlert,
}) {
  // Handle the alert cancel.
  const handleCancel = () => {
    closeAlert(name);
  };

  // Handle confirm the alert.
  const handleConfirm = (event) => {
    closeAlert(name);
    saveInvoke(onConfirm, event);
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'clear_all_lines'} />}
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={false}
    >
      <p>Clearing the table lines will delete all quantities and rate were applied to the items, Is this okay?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ItemsEntriesDeleteAlert);
