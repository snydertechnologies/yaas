import { Button, Classes, Intent, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { useRefundCreditNoteDrawerContext } from './RefundCreditNoteDrawerProvider';

import { Can, DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, CreditNoteAction } from '@bigcapital/webapp/constants/abilityOption';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund credit note actions bar.
 */
function RefundCreditNoteDetailActionsBar({
  // #withAlertsActions
  openAlert,
}) {
  const { refundTransactionId } = useRefundCreditNoteDrawerContext();

  // Handle delete refund credit.
  const handleDeleteRefundCreditNote = () => {
    openAlert('refund-credit-delete', { creditNoteId: refundTransactionId });
  };

  return (
    <Can I={CreditNoteAction.Delete} a={AbilitySubject.CreditNote}>
      <DrawerActionsBar>
        <NavbarGroup>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleDeleteRefundCreditNote}
          />
        </NavbarGroup>
      </DrawerActionsBar>
    </Can>
  );
}

export default compose(withAlertsActions)(RefundCreditNoteDetailActionsBar);
