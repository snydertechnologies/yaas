import { Button, Classes, Intent, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { Can, DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, VendorCreditAction } from '@bigcapital/webapp/constants/abilityOption';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import { useRefundVendorCreditNoteDrawerContext } from './RefundVendorCreditDrawerProvider';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Refund vendor credit actions bar.
 */
function RefundVendorCreditDetailActionsBar({
  // #withAlertsActions
  openAlert,
}) {
  const { refundTransactionId } = useRefundVendorCreditNoteDrawerContext();

  // Handle delete refund vendor credit.
  const handleDeleteRefundVendorCredit = () => {
    openAlert('refund-vendor-delete', { vendorCreditId: refundTransactionId });
  };

  return (
    <Can I={VendorCreditAction.Delete} a={AbilitySubject.VendorCredit}>
      <DrawerActionsBar>
        <NavbarGroup>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleDeleteRefundVendorCredit}
          />
        </NavbarGroup>
      </DrawerActionsBar>
    </Can>
  );
}

export default compose(withAlertsActions)(RefundVendorCreditDetailActionsBar);
