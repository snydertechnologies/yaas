import { FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useProjectExpenseFormContext } from './ProjectExpenseFormProvider';

function ProjectExpneseFormFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  // expense form dialog context.
  const { dialogName } = useProjectExpenseFormContext();

  // Handle close button click.
  const handleCancelBtnClick = () => {
    closeDialog(dialogName);
  };

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={handleCancelBtnClick} style={{ minWidth: '75px' }}>
          <T id={'cancel'} />
        </Button>
        <Button intent={Intent.PRIMARY} loading={isSubmitting} style={{ minWidth: '75px' }} type="submit">
          {<T id={'save'} />}
        </Button>
      </div>
    </div>
  );
}

export default compose(withDialogActions)(ProjectExpneseFormFloatingActions);
