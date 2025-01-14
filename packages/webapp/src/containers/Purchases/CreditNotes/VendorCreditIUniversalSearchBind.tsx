import { Intent, MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Choose, Icon, T, TextStatus } from '@bigcapital/webapp/components';
import { AbilitySubject, VendorCreditAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

/**
 * Vendor credit universal search item select action.
 */
function VendorCreditUniversalSearchSelectComponent({
  // #ownProps
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.VENDOR_CREDIT) {
    openDrawer(DRAWERS.VENDOR_CREDIT_DETAILS, {
      vendorCreditId: resourceId,
    });
    onAction && onAction();
  }
  return null;
}

export const VendorCreditUniversalSearchSelect = withDrawerActions(VendorCreditUniversalSearchSelectComponent);

/**
 * Status accessor.
 */
function VendorCreditUniversalSearchStatus({ receipt }) {
  return (
    <Choose>
      <Choose.When condition={receipt.is_closed}>
        <TextStatus intent={Intent.SUCCESS}>
          <T id={'closed'} />
        </TextStatus>
      </Choose.When>

      <Choose.When condition={receipt.is_open}>
        <TextStatus intent={Intent.WARNING}>
          <T id={'closed'} />
        </TextStatus>
      </Choose.When>

      <Choose.Otherwise>
        <TextStatus intent={Intent.NONE}>
          <T id={'draft'} />
        </TextStatus>
      </Choose.Otherwise>
    </Choose>
  );
}

/**
 * Credit note universal search item.
 */
export function VendorCreditUniversalSearchItem(item, { handleClick, modifiers, query }) {
  return (
    <MenuItem
      active={modifiers.active}
      text={
        <div>
          <div>{item.text}</div>
          <span className="bp4-text-muted">
            {item.reference.vendor_credit_number} <Icon icon={'caret-right-16'} iconSize={16} />
            {item.reference.formatted_vendor_credit_date}
          </span>
        </div>
      }
      label={
        <>
          <div className="amount">{item.reference.formatted_amount}</div>
          <VendorCreditUniversalSearchStatus receipt={item.reference} />
        </>
      }
      onClick={handleClick}
      className={'universal-search__item--receipt'}
    />
  );
}

/**
 * Transformes receipt resource item to search item.
 */
const transformVendorCreditsToSearch = (vendorCredit) => ({
  id: vendorCredit.id,
  text: vendorCredit.vendor.display_name,
  label: vendorCredit.formatted_amount,
  reference: vendorCredit,
});

/**
 * Credit note universal search bind configuration.
 */
export const universalSearchVendorCreditBind = () => ({
  resourceType: RESOURCES_TYPES.VENDOR_CREDIT,
  optionItemLabel: intl.get('vendor_credit.label'),
  selectItemAction: VendorCreditUniversalSearchSelect,
  itemRenderer: VendorCreditUniversalSearchItem,
  itemSelect: transformVendorCreditsToSearch,
  permission: {
    ability: VendorCreditAction.View,
    subject: AbilitySubject.VendorCredit,
  },
});
