import { DialogContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import { queryCache, useQuery } from 'react-query';

import ReferenceNumberForm from '@bigcapital/webapp/containers/JournalNumber/ReferenceNumberForm';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withBillActions from '@bigcapital/webapp/containers/Purchases/Bills/BillsLanding/withBillsActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';

import { compose, optionsMapToArray } from '@bigcapital/webapp/utils';

/**
 * bill number dialog's content.
 */

function BillNumberDialogContent({
  // #withSettings
  nextNumber,
  numberPrefix,

  // #withSettingsActions
  requestFetchOptions,
  requestSubmitOptions,

  // #withDialogActions
  closeDialog,

  // #withBillActions
  setBillNumberChanged,
}) {
  const fetchSettings = useQuery(['settings'], () => requestFetchOptions({}));

  const handleSubmitForm = (values, { setSubmitting }) => {
    const options = optionsMapToArray(values).map((option) => {
      return { key: option.key, ...option, group: 'bills' };
    });

    requestSubmitOptions({ options })
      .then(() => {
        setSubmitting(false);
        closeDialog('bill-number-form');
        setBillNumberChanged(true);

        setTimeout(() => {
          queryCache.invalidateQueries('settings');
        }, 250);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const handleClose = () => {
    closeDialog('bill-number-form');
  };

  return (
    <DialogContent isLoading={fetchSettings.isFetching}>
      <ReferenceNumberForm
        initialNumber={nextNumber}
        initialPrefix={numberPrefix}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
      />
    </DialogContent>
  );
}

export default compose(
  withDialogActions,
  withSettingsActions,
  withSettings(({ billsettings }) => ({
    nextNumber: billsettings?.next_number,
    numberPrefix: billsettings?.number_prefix,
  })),
  withBillActions,
)(BillNumberDialogContent);
