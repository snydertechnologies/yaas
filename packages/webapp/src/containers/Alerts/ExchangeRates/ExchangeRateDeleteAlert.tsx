import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import { useDeleteExchangeRate } from '@bigcapital/webapp/hooks/query';

import { compose } from '@bigcapital/webapp/utils';

/**
 * exchange rate delete alerts.
 */
function ExchangeRateDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { exchangeRateId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteExchangeRate, isLoading } = useDeleteExchangeRate();

  // Handle cancel delete exchange rate alert.
  const handleCancelExchangeRateDelete = () => closeAlert(name);

  const handelConfirmExchangeRateDelete = () => {
    deleteExchangeRate(exchangeRateId)
      .then((response) => {
        AppToaster.show({
          message: intl.get('the_exchange_rates_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
      })
      .catch(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelExchangeRateDelete}
      onConfirm={handelConfirmExchangeRateDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_exchange_rate_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(ExchangeRateDeleteAlert);
