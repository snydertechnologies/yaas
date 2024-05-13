// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Classes, Intent, NavbarDivider, NavbarGroup } from '@blueprintjs/core';

import { Can, DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, SaleReceiptAction } from '@bigcapital/webapp/constants/abilityOption';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { compose, safeCallback } from '@bigcapital/webapp/utils';
import { useReceiptDetailDrawerContext } from './ReceiptDetailDrawerProvider';
import { ReceiptMoreMenuItems } from './components';

/**
 * Receipt details actions bar.
 * @returns {React.JSX}
 */
function ReceiptDetailActionBar({
  // #withDialogActions
  openDialog,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const history = useHistory();
  const { receiptId } = useReceiptDetailDrawerContext();

  // Handle edit sale receipt.
  const onEditReceipt = () => {
    history.push(`/receipts/${receiptId}/edit`);
    closeDrawer(DRAWERS.RECEIPT_DETAILS);
  };

  // Handle delete sale receipt.
  const onDeleteReceipt = () => {
    openAlert('receipt-delete', { receiptId });
  };
  // Handle print receipt.
  const onPrintReceipt = () => {
    openDialog('receipt-pdf-preview', { receiptId });
  };
  // Handle notify via SMS.
  const handleNotifyViaSMS = () => {
    openDialog('notify-receipt-via-sms', { receiptId });
  };
  const handleReceiptMail = () => {
    openDialog(DialogsName.ReceiptMail, { receiptId });
  };

  return (
    <DrawerActionsBar>
      <NavbarGroup>
        <Can I={SaleReceiptAction.Edit} a={AbilitySubject.Receipt}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="pen-18" />}
            text={<T id={'edit_receipt'} />}
            onClick={safeCallback(onEditReceipt)}
          />
          <NavbarDivider />
        </Can>
        <Can I={SaleReceiptAction.View} a={AbilitySubject.Receipt}>
          <Button
            className={Classes.MINIMAL}
            text={'Send Mail'}
            icon={<Icon icon="envelope" />}
            onClick={handleReceiptMail}
          />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="print-16" />}
            text={<T id={'print'} />}
            onClick={safeCallback(onPrintReceipt)}
          />
        </Can>
        <Can I={SaleReceiptAction.Delete} a={AbilitySubject.Receipt}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={safeCallback(onDeleteReceipt)}
          />
        </Can>
        <Can I={SaleReceiptAction.NotifyBySms} a={AbilitySubject.Receipt}>
          <NavbarDivider />
          <ReceiptMoreMenuItems
            payload={{
              onNotifyViaSMS: handleNotifyViaSMS,
            }}
          />
        </Can>
      </NavbarGroup>
    </DrawerActionsBar>
  );
}

export default compose(withDialogActions, withDrawerActions, withAlertsActions)(ReceiptDetailActionBar);
