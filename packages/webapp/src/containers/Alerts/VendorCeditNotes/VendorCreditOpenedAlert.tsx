import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useOpenVendorCredit } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 *  Vendor credit opened alert.
 */
function VendorCreditOpenedAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { vendorCreditId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: openVendorCreditMutate, isLoading } = useOpenVendorCredit();

  // Handle cancel opened credit note alert.
  const handleAlertCancel = () => {
    closeAlert(name);
  };

  // Handle confirm  vendor credit as opened.
  const handleAlertConfirm = () => {
    openVendorCreditMutate(vendorCreditId)
      .then(() => {
        AppToaster.show({
          message: intl.get('vendor_credit_opened.alert.success_message'),
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
      confirmButtonText={<T id={'open'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleAlertCancel}
      onConfirm={handleAlertConfirm}
      loading={isLoading}
    >
      <p>
        <T id={'vendor_credit_opened.are_sure_to_open_this_credit'} />
      </p>
    </Alert>
  );
}
export default compose(withAlertStoreConnect(), withAlertActions)(VendorCreditOpenedAlert);
