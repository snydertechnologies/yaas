import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Clearning all lines alert.
 */
function ClearAllLinesAlert({
  name,

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

  // Handle confirm delete manual journal.
  const handleConfirm = () => {};

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'action'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={false}
    >
      <p>Clearing the table lines will delete all credits and payments were applied. Is this okay?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ClearAllLinesAlert);
