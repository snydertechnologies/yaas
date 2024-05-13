import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useOpenCreditNote } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Credit note opened alert.
 */
function CreditNoteOpenedAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { creditNoteId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: openCreditNoteMutate, isLoading } = useOpenCreditNote();

  // Handle cancel opened credit note alert.
  const handleAlertCancel = () => {
    closeAlert(name);
  };

  // Handle confirm credit note opened.
  const handleAlertConfirm = () => {
    openCreditNoteMutate(creditNoteId)
      .then(() => {
        AppToaster.show({
          message: intl.get('credit_note_opened.alert.success_message'),
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
        <T id={'credit_note_opened.are_sure_to_open_this_credit'} />
      </p>
    </Alert>
  );
}
export default compose(withAlertStoreConnect(), withAlertActions)(CreditNoteOpenedAlert);
