import { Can, DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, Intent, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { AbilitySubject, ManualJournalAction } from '@bigcapital/webapp/constants/abilityOption';
import { useManualJournalDrawerContext } from './ManualJournalDrawerProvider';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Manual journal action bar.
 */
function ManualJournalDrawerActionBar({
  // #withAlertsDialog
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const history = useHistory();
  const { manualJournalId } = useManualJournalDrawerContext();

  // Handle edit manual journal action.
  const handleEditManualJournal = () => {
    history.push(`/manual-journals/${manualJournalId}/edit`);
    closeDrawer(DRAWERS.JOURNAL_DETAILS);
  };

  // Handle manual journal delete action.
  const handleDeleteManualJournal = () => {
    openAlert('journal-delete', { manualJournalId });
  };

  return (
    <DrawerActionsBar>
      <NavbarGroup>
        <Can I={ManualJournalAction.Edit} a={AbilitySubject.ManualJournal}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="pen-18" />}
            text={<T id={'edit_journal'} />}
            onClick={handleEditManualJournal}
          />
        </Can>
        <Can I={ManualJournalAction.Delete} a={AbilitySubject.ManualJournal}>
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="trash-16" iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleDeleteManualJournal}
          />
        </Can>
      </NavbarGroup>
    </DrawerActionsBar>
  );
}

export default compose(withAlertsActions, withDrawerActions)(ManualJournalDrawerActionBar);
