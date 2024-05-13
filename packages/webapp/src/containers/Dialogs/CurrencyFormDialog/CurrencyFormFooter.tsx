import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useCurrencyFormContext } from './CurrencyFormProvider';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, Intent } from '@blueprintjs/core';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Currency dialog form footer action.
 */
function CurrencyFormFooter({
  // #withDialogActions
  closeDialog,
}) {
  const { isSubmitting } = useFormikContext();

  const { dialogName, isEditMode } = useCurrencyFormContext();

  const handleClose = () => {
    closeDialog(dialogName);
  };

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={handleClose} disabled={isSubmitting}>
          <T id={'cancel'} />
        </Button>
        <Button intent={Intent.PRIMARY} type="submit" loading={isSubmitting}>
          {!isEditMode ? <T id={'submit'} /> : <T id={'edit'} />}
        </Button>
      </div>
    </div>
  );
}

export default compose(withDialogActions)(CurrencyFormFooter);
