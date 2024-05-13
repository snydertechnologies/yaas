import {
  AdvancedFilterPopover,
  Can,
  DashboardActionViewsList,
  DashboardActionsBar,
  DashboardFilterButton,
  DashboardRowsHeightButton,
  Icon,
  If,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { AbilitySubject, ManualJournalAction } from '@bigcapital/webapp/constants/abilityOption';
import { useRefreshJournals } from '@bigcapital/webapp/hooks/query/manualJournals';
import { Alignment, Button, Classes, Intent, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useManualJournalsContext } from './ManualJournalsListProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';
import withManualJournals from './withManualJournals';
import withManualJournalsActions from './withManualJournalsActions';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Manual journal actions bar.
 */
function ManualJournalActionsBar({
  // #withManualJournalsActions
  setManualJournalsTableState,

  // #withManualJournals
  manualJournalsFilterConditions,

  // #withSettings
  manualJournalsTableSize,

  // #withSettingsActions
  addSetting,

  // #withDialogActions
  openDialog,
}) {
  // History context.
  const history = useHistory();

  // Manual journals context.
  const { journalsViews, fields } = useManualJournalsContext();

  // Manual journals refresh action.
  const { refresh } = useRefreshJournals();

  // Handle click a new manual journal.
  const onClickNewManualJournal = () => {
    history.push('/make-journal-entry');
  };
  // Handle delete button click.
  const handleBulkDelete = () => {};

  // Handle tab change.
  const handleTabChange = (view) => {
    setManualJournalsTableState({ viewSlug: view ? view.slig : null });
  };
  // Handle click a refresh Journals
  const handleRefreshBtnClick = () => {
    refresh();
  };
  // Handle import button click.
  const handleImportBtnClick = () => {
    history.push('/manual-journals/import');
  };

  // Handle table row size change.
  const handleTableRowSizeChange = (size) => {
    addSetting('manualJournals', 'tableSize', size);
  };

  // Handle the export button click.
  const handleExportBtnClick = () => {
    openDialog(DialogsName.Export, { resource: 'manual_journal' });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <DashboardActionViewsList
          resourceName={'manual-journals'}
          allMenuItem={true}
          views={journalsViews}
          onChange={handleTabChange}
        />
        <NavbarDivider />
        <Can I={ManualJournalAction.Create} a={AbilitySubject.ManualJournal}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="plus" />}
            text={<T id={'journal_entry'} />}
            onClick={onClickNewManualJournal}
          />
        </Can>
        <AdvancedFilterPopover
          advancedFilterProps={{
            conditions: manualJournalsFilterConditions,
            defaultFieldKey: 'journal_number',
            fields,
            onFilterChange: (filterConditions) => {
              setManualJournalsTableState({ filterRoles: filterConditions });
            },
          }}
        >
          <DashboardFilterButton conditionsCount={manualJournalsFilterConditions.length} />
        </AdvancedFilterPopover>

        <If condition={false}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="trash-16" iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleBulkDelete}
          />
        </If>

        <Button className={Classes.MINIMAL} icon={<Icon icon="print-16" iconSize={16} />} text={<T id={'print'} />} />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-import-16" iconSize={16} />}
          text={<T id={'import'} />}
          onClick={handleImportBtnClick}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
          onClick={handleExportBtnClick}
        />
        <NavbarDivider />
        <DashboardRowsHeightButton initialValue={manualJournalsTableSize} onChange={handleTableRowSizeChange} />
        <NavbarDivider />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="refresh-16" iconSize={14} />}
          onClick={handleRefreshBtnClick}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withDialogActions,
  withManualJournalsActions,
  withSettingsActions,
  withManualJournals(({ manualJournalsTableState }) => ({
    manualJournalsFilterConditions: manualJournalsTableState.filterRoles,
  })),
  withSettings(({ manualJournalsSettings }) => ({
    manualJournalsTableSize: manualJournalsSettings?.tableSize,
  })),
)(ManualJournalActionsBar);
