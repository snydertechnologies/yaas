import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
import { size } from 'lodash';
// @ts-nocheck
import React, { useState } from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withItemsActions from '@bigcapital/webapp/containers/Items/withItemsActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Item bulk delete alert.
 */
function ItemBulkDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { itemsIds },

  // #withItemsActions
  requestDeleteBulkItems,

  // #withAlertActions
  closeAlert,
}) {
  const [isLoading, setLoading] = useState(false);

  // handle cancel item bulk delete alert.
  const handleCancelBulkDelete = () => {
    closeAlert(name);
  };
  // Handle confirm items bulk delete.
  const handleConfirmBulkDelete = () => {
    setLoading(true);
    requestDeleteBulkItems(itemsIds)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_items_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
      })
      .catch((errors) => {})
      .finally(() => {
        setLoading(false);
        closeAlert(name);
      });
  };
  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete_count'} values={{ count: size(itemsIds) }} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelBulkDelete}
      onConfirm={handleConfirmBulkDelete}
      loading={isLoading}
    >
      <p>
        <T id={'once_delete_these_items_you_will_not_able_restore_them'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withItemsActions)(ItemBulkDeleteAlert);
