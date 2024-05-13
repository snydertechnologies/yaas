import {
  Button,
  Classes,
  Intent,
  Menu,
  MenuItem,
  NavbarDivider,
  NavbarGroup,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import clsx from 'classnames';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useVendorDetailsDrawerContext } from './VendorDetailsDrawerProvider';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { Can, DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose, safeCallback } from '@bigcapital/webapp/utils';
import { AbilitySubject, PaymentMadeAction, SaleInvoiceAction, VendorAction } from '../../../constants/abilityOption';
import { VendorMoreMenuItem } from './utils';

/**
 * Vendor details actions bar.
 */
function VendorDetailsActionsBar({
  // #withDialogActions
  openDialog,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { vendorId } = useVendorDetailsDrawerContext();
  const history = useHistory();

  // Handle edit vendor.
  const onEditContact = () => {
    history.push(`/vendors/${vendorId}/edit`);
    closeDrawer(DRAWERS.VENDOR_DETAILS);
  };

  // Handle delete vendor.
  const onDeleteContact = () => {
    openAlert(`vendor-delete`, { contactId: vendorId });
  };

  // Handles clicking on new invoice button.
  const handleNewInvoiceClick = () => {
    history.push('/bills/new');
    closeDrawer(DRAWERS.VENDOR_DETAILS);
  };

  const handleNewPaymentClick = () => {
    history.push('/payment-mades/new');
    closeDrawer(DRAWERS.VENDOR_DETAILS);
  };

  const handleEditOpeningBalance = () => {
    openDialog('vendor-opening-balance', { vendorId });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Popover
          content={
            <Menu>
              <Can I={SaleInvoiceAction.Create} a={AbilitySubject.Invoice}>
                <MenuItem text={<T id={'vendor.drawer.action.new_invoice'} />} onClick={handleNewInvoiceClick} />
              </Can>
              <Can I={PaymentMadeAction.Create} a={AbilitySubject.PaymentMade}>
                <MenuItem text={<T id={'vendor.drawer.action.new_payment'} />} onClick={handleNewPaymentClick} />
              </Can>
            </Menu>
          }
          minimal={true}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_LEFT}
        >
          <Button
            className={clsx(Classes.MINIMAL)}
            text={<T id={'vendor.drawer.action.new_transaction'} />}
            icon={<Icon icon={'plus'} />}
          />
        </Popover>
        <Can I={VendorAction.Edit} a={AbilitySubject.Vendor}>
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="pen-18" />}
            text={<T id={'vendor.drawer.action.edit'} />}
            onClick={safeCallback(onEditContact)}
          />
        </Can>
        <Can I={VendorAction.Delete} a={AbilitySubject.Vendor}>
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'vendor.drawer.action.delete'} />}
            intent={Intent.DANGER}
            onClick={safeCallback(onDeleteContact)}
          />
        </Can>
        <NavbarDivider />
        <VendorMoreMenuItem
          payload={{
            onEditOpeningBalance: handleEditOpeningBalance,
          }}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(withDrawerActions, withAlertsActions, withDialogActions)(VendorDetailsActionsBar);
