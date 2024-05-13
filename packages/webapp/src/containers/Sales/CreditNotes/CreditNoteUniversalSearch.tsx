import { Intent, MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Choose, Icon, T, TextStatus } from '@bigcapital/webapp/components';

import { AbilitySubject, CreditNoteAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

/**
 * Credit note universal search item select action.
 */
function CreditNoteUniversalSearchSelectComponent({
  // #ownProps
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.CREDIT_NOTE) {
    openDrawer(DRAWERS.CREDIT_NOTE_DETAILS, { creditNoteId: resourceId });
    onAction && onAction();
  }
  return null;
}

export const CreditNoteUniversalSearchSelect = withDrawerActions(CreditNoteUniversalSearchSelectComponent);

/**
 * Status accessor.
 */
function CreditNoteUniversalSearchStatus({ receipt }) {
  return (
    <Choose>
      <Choose.When condition={receipt.is_closed}>
        <TextStatus intent={Intent.SUCCESS}>
          <T id={'closed'} />
        </TextStatus>
      </Choose.When>

      <Choose.When condition={receipt.is_open}>
        <TextStatus intent={Intent.WARNING}>
          <T id={'open'} />
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
export function CreditNoteUniversalSearchItem(item, { handleClick, modifiers, query }) {
  return (
    <MenuItem
      active={modifiers.active}
      text={
        <div>
          <div>{item.text}</div>
          <span className="bp4-text-muted">
            {item.reference.credit_note_number} <Icon icon={'caret-right-16'} iconSize={16} />
            {item.reference.formatted_credit_note_date}
          </span>
        </div>
      }
      label={
        <>
          <div className="amount">{item.reference.formatted_amount}</div>
          <CreditNoteUniversalSearchStatus receipt={item.reference} />
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
const transformReceiptsToSearch = (creditNote) => ({
  id: creditNote.id,
  text: creditNote.customer.display_name,
  label: creditNote.formatted_amount,
  reference: creditNote,
});

/**
 * Credit note universal search bind configuration.
 */
export const universalSearchCreditNoteBind = () => ({
  resourceType: RESOURCES_TYPES.CREDIT_NOTE,
  optionItemLabel: intl.get('credit_note.label'),
  selectItemAction: CreditNoteUniversalSearchSelect,
  itemRenderer: CreditNoteUniversalSearchItem,
  itemSelect: transformReceiptsToSearch,
  permission: {
    ability: CreditNoteAction.View,
    subject: AbilitySubject.CreditNote,
  },
});
