import { FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useProjectFormContext } from './ProjectFormProvider';

/**
 * Project form floating actions.
 * @returns
 */
function ProjectFormFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button intent={Intent.PRIMARY} loading={isSubmitting} style={{ minWidth: '100px' }} type="submit">
          <T id={'projects.label.create'} />
        </Button>
      </div>
    </div>
  );
}

export default compose(withDialogActions)(ProjectFormFloatingActions);
