import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Items/utils';
import { useDeleteItem } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withItemsActions from '@bigcapital/webapp/containers/Items/withItemsActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Item delete alerts.
 */
function ItemDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { itemId },

  // #withAlertActions
  closeAlert,

  // #withItemsActions
  setItemsTableState,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteItem, isLoading } = useDeleteItem();

  // Handle cancel delete item alert.
  const handleCancelItemDelete = () => {
    closeAlert(name);
  };

  // Handle confirm delete item.
  const handleConfirmDeleteItem = () => {
    deleteItem(itemId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_item_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        // Reset to page number one.
        setItemsTableState({ page: 1 });
        closeDrawer(DRAWERS.ITEM_DETAILS);
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
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelItemDelete}
      onConfirm={handleConfirmDeleteItem}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_item_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withItemsActions, withDrawerActions)(ItemDeleteAlert);
