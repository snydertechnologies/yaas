import { MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Choose, Icon, If, T } from '@bigcapital/webapp/components';
import { formattedAmount } from '@bigcapital/webapp/utils';

import { AbilitySubject, BillAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

/**
 * Universal search bill item select action.
 */
function BillUniversalSearchSelectComponent({
  // #ownProps
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.BILL) {
    openDrawer(DRAWERS.BILL_DETAILS, { billId: resourceId });
    onAction && onAction();
  }
  return null;
}

export const BillUniversalSearchSelect = withDrawerActions(BillUniversalSearchSelectComponent);

/**
 * Status accessor.
 */
export function BillStatus({ bill }) {
  return (
    <Choose>
      <Choose.When condition={bill.is_fully_paid && bill.is_open}>
        <span className="fully-paid-text">
          <T id={'paid'} />
        </span>
      </Choose.When>
      <Choose.When condition={bill.is_open}>
        <Choose>
          <Choose.When condition={bill.is_overdue}>
            <span className={'overdue-status'}>{intl.get('overdue_by', { overdue: bill.overdue_days })}</span>
          </Choose.When>
          <Choose.Otherwise>
            <span className={'due-status'}>{intl.get('due_in', { due: bill.remaining_days })}</span>
          </Choose.Otherwise>
        </Choose>
        <If condition={bill.is_partially_paid}>
          <span className="partial-paid">
            {intl.get('day_partially_paid', {
              due: formattedAmount(bill.due_amount, bill.currency_code),
            })}
          </span>
        </If>
      </Choose.When>
      <Choose.Otherwise>
        <span className="draft">
          <T id={'draft'} />
        </span>
      </Choose.Otherwise>
    </Choose>
  );
}

/**
 * Bill universal search item.
 */
export function BillUniversalSearchItem(item, { handleClick, modifiers, query }) {
  return (
    <MenuItem
      active={modifiers.active}
      text={
        <div>
          <div>{item.text}</div>
          <span className="bp4-text-muted">
            {item.reference.bill_number} <Icon icon={'caret-right-16'} iconSize={16} />
            {item.reference.formatted_bill_date}
          </span>
        </div>
      }
      label={
        <>
          <div className="amount">{item.reference.formatted_amount}</div>
          <BillStatus bill={item.reference} />
        </>
      }
      onClick={handleClick}
      className={'universal-search__item--bill'}
    />
  );
}

const billsToSearch = (bill) => ({
  id: bill.id,
  text: bill.vendor.display_name,
  reference: bill,
});

export const universalSearchBillBind = () => ({
  resourceType: RESOURCES_TYPES.BILL,
  optionItemLabel: intl.get('bills'),
  selectItemAction: BillUniversalSearchSelect,
  itemRenderer: BillUniversalSearchItem,
  itemSelect: billsToSearch,
  permission: {
    ability: BillAction.View,
    subject: AbilitySubject.Bill,
  },
});
