import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useDeleteItemCategory } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Item Category delete alerts.
 */
function ItemCategoryDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { itemCategoryId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteItemCategory, isLoading } = useDeleteItemCategory();

  // handle cancel delete item category alert.
  const handleCancelItemCategoryDelete = () => {
    closeAlert(name);
  };

  // Handle alert confirm delete item category.
  const handleConfirmItemDelete = () => {
    deleteItemCategory(itemCategoryId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_item_category_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
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
      onCancel={handleCancelItemCategoryDelete}
      onConfirm={handleConfirmItemDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_item_category_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ItemCategoryDeleteAlert);
