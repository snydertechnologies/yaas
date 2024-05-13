import { Button, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import { DialogFooter, DialogFooterActions, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { useSMSMessageDialogContext } from './SMSMessageDialogProvider';

import { compose } from '@bigcapital/webapp/utils';

/**
 * SMS Message Form floating actions.
 */
function SMSMessageFormFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  // SMS Message dialog contxt.
  const { dialogName } = useSMSMessageDialogContext();

  // Handle close button click.
  const handleCancelBtnClick = () => {
    closeDialog(dialogName);
  };

  return (
    <DialogFooter>
      <DialogFooterActions alignment={'left'}>
        <Button intent={Intent.PRIMARY} loading={isSubmitting} style={{ minWidth: '75px' }} type="submit">
          <T id={'save_sms_message'} />
        </Button>
        <Button onClick={handleCancelBtnClick} style={{ minWidth: '75px' }}>
          <T id={'cancel'} />
        </Button>
      </DialogFooterActions>
    </DialogFooter>
  );
}

export default compose(withDialogActions)(SMSMessageFormFloatingActions);
