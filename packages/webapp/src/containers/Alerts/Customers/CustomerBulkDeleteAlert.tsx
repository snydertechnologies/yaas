import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { AppToaster } from '@bigcapital/webapp/components';
import { transformErrors } from '@bigcapital/webapp/containers/Customers/utils';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useCallback, useState } from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Customer bulk delete alert.
 */
function CustomerBulkDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { customersIds },

  // #withAlertActions
  closeAlert,
}) {
  const [isLoading, setLoading] = useState(false);

  // handle cancel delete  alert.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // Handle confirm customers bulk delete.
  const handleConfirmBulkDelete = useCallback(() => {
    setLoading(true);
    requestDeleteBulkCustomers(customersIds)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_customers_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
      })
      .catch((errors) => {
        transformErrors(errors);
      })
      .finally(() => {
        setLoading(false);
        closeAlert(name);
      });
  }, [requestDeleteBulkCustomers, customersIds]);

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelDeleteAlert}
      onConfirm={handleConfirmBulkDelete}
      loading={isLoading}
    >
      <p>
        <T id={'once_delete_these_customers_you_will_not_able_restore_them'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(CustomerBulkDeleteAlert);
