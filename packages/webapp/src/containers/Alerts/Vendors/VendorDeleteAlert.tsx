import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import { transformErrors } from '@bigcapital/webapp/containers/Vendors/utils';
import { useDeleteVendor } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Vendor delete alert.
 */
function VendorDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { contactId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteVendorMutate, isLoading } = useDeleteVendor();

  // Handle cancel delete the vendor.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // Handle confirm delete vendor.
  const handleConfirmDeleteVendor = useCallback(() => {
    deleteVendorMutate(contactId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_vendor_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.VENDOR_DETAILS);
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
  }, [deleteVendorMutate, name, closeAlert, contactId]);

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelDeleteAlert}
      onConfirm={handleConfirmDeleteVendor}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_vendor_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(VendorDeleteAlert);
