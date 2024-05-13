import { FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useProjectInvoicingFormContext } from './ProjectInvoicingFormProvider';

/**
 * Project invoicing from floating actions
 * @returns
 */
function ProjectInvoicingFormFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  // project invoicing form dialog context.
  const { dialogName } = useProjectInvoicingFormContext();

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
        <Button intent={Intent.PRIMARY} loading={isSubmitting} style={{ minWidth: '75px' }} type="submit">
          <T id={'project_invoicing.label.add'} />
        </Button>
      </div>
    </div>
  );
}

export default compose(withDialogActions)(ProjectInvoicingFormFloatingActions);
