import { MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Icon } from '@bigcapital/webapp/components';
import { AbilitySubject, PaymentMadeAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { highlightText } from '@bigcapital/webapp/utils';

/**
 * Universal search bill item select action.
 */
function PaymentMadeUniversalSearchSelectComponent({
  // #ownProps
  resourceType,
  resourceId,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.PAYMENT_MADE) {
    openDrawer(DRAWERS.PAYMENT_MADE_DETAILS, { paymentMadeId: resourceId });
  }
  return null;
}

export const PaymentMadeUniversalSearchSelect = withDrawerActions(PaymentMadeUniversalSearchSelectComponent);

/**
 * Payment made universal search item.
 */
export function PaymentMadeUniversalSearchItem({ text, label, reference }, { handleClick, modifiers, query }) {
  return (
    <MenuItem
      active={modifiers.active}
      text={
        <div>
          <div>{highlightText(text, query)}</div>

          <span className="bp4-text-muted">
            {reference.payment_number && (
              <>
                {highlightText(reference.payment_number, query)}
                <Icon icon={'caret-right-16'} iconSize={16} />
              </>
            )}
            {highlightText(reference.formatted_payment_date, query)}
          </span>
        </div>
      }
      label={<div className="amount">{label}</div>}
      onClick={handleClick}
      className={'universal-search__item--payment-made'}
    />
  );
}

/**
 * Payment made resource item to search item.
 */
const paymentMadeToSearch = (payment) => ({
  id: payment.id,
  text: payment.vendor.display_name,
  label: payment.formatted_amount,
  reference: payment,
});

/**
 * Binds universal search payment made configure.
 */
export const universalSearchPaymentMadeBind = () => ({
  resourceType: RESOURCES_TYPES.PAYMENT_MADE,
  optionItemLabel: intl.get('payment_mades'),
  selectItemAction: PaymentMadeUniversalSearchSelect,
  itemRenderer: PaymentMadeUniversalSearchItem,
  itemSelect: paymentMadeToSearch,
  permission: {
    ability: PaymentMadeAction.View,
    subject: AbilitySubject.PaymentMade,
  },
});
