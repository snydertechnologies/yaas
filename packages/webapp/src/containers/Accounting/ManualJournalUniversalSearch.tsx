import { AbilitySubject, ManualJournalAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
// @ts-nocheck
import intl from 'react-intl-universal';

/**
 * Universal search manual journal item select action.
 */
function JournalUniversalSearchSelectComponent({
  // #ownProps
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.MANUAL_JOURNAL) {
    openDrawer(DRAWERS.JOURNAL_DETAILS, { manualJournalId: resourceId });
    onAction && onAction();
  }
  return null;
}

export const JournalUniversalSearchSelectAction = withDrawerActions(JournalUniversalSearchSelectComponent);

/**
 * Mappes the manual journal item to search item.
 */
const manualJournalsToSearch = (manualJournal) => ({
  id: manualJournal.id,
  text: manualJournal.journal_number,
  subText: manualJournal.formatted_date,
  label: manualJournal.formatted_amount,
  reference: manualJournal,
});

/**
 * Binds universal search invoice configure.
 */
export const universalSearchJournalBind = () => ({
  resourceType: RESOURCES_TYPES.MANUAL_JOURNAL,
  optionItemLabel: intl.get('manual_journals'),
  selectItemAction: JournalUniversalSearchSelectAction,
  itemSelect: manualJournalsToSearch,
  permission: {
    ability: ManualJournalAction.View,
    subject: AbilitySubject.ManualJournal,
  },
});
