import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { useRefundCreditNoteContext } from './RefundCreditNoteFormProvider';

/**
 * Refund credit note floating actions.
 */
function RefundCreditNoteFloatingActions({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  // refund credit note dialog context.
  const { dialogName } = useRefundCreditNoteContext();

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
        <Button
          intent={Intent.PRIMARY}
          loading={isSubmitting}
          style={{ minWidth: '120px' }}
          type="submit"
          text={<T id={'refund'} />}
        />
      </div>
    </div>
  );
}
export default compose(withDialogActions)(RefundCreditNoteFloatingActions);
