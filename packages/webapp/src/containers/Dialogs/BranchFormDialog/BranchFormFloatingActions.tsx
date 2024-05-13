// @ts-nocheck
import React from 'react';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { useBranchFormContext } from './BranchFormProvider';

/**
 * Branch form floating actions.
 */
function BranchFormFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  const { dialogName } = useBranchFormContext();

  // Handle close button click.
  const handleCancelBtnClick = () => {
    closeDialog(dialogName);
  };

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={handleCancelBtnClick} style={{ minWidth: '85px' }}>
          <T id={'cancel'} />
        </Button>
        <Button intent={Intent.PRIMARY} loading={isSubmitting} style={{ minWidth: '95px' }} type="submit">
          {<T id={'save'} />}
        </Button>
      </div>
    </div>
  );
}
export default compose(withDialogActions)(BranchFormFloatingActions);
