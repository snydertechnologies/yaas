import {
  DashboardActionsBar,
  DashboardRowsHeightButton,
  Icon,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';
import { compose } from '@bigcapital/webapp/utils';
import { Alignment, Button, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useProjectDetailContext } from './ProjectDetailProvider';
import { projectTranslations } from './common';
import { ProjectTransactionsSelect } from './components';

/**
 * Project detail actions bar.
 * @returns
 */
function ProjectDetailActionsBar({
  // #withDialogActions
  openDialog,

  // #withSettings
  timesheetsTableSize,

  // #withSettingsActions
  addSetting,
}) {
  const { projectId } = useProjectDetailContext();

  // Handle new transaction button click.
  const handleNewTransactionBtnClick = ({ path }) => {
    switch (path) {
      case 'project_task':
        openDialog('project-task-form', { projectId });
        break;
      case 'invoincing':
        openDialog('project-invoicing-form');
        break;
      case 'expense':
        openDialog('project-expense-form', { projectId });
        break;
      case 'estimated_expense':
        openDialog('estimated-expense-form', { projectId });
    }
  };

  const handleEditProjectBtnClick = () => {
    openDialog('project-form', {
      projectId,
    });
  };
  // Handle table row size change.
  const handleTableRowSizeChange = (size) => {
    addSetting('timesheets', 'tableSize', size) &&
      addSetting('sales', 'tableSize', size) &&
      addSetting('purchases', 'tableSize', size) &&
      addSetting('project_tasks', 'tableSize', size);
  };

  const handleTimeEntryBtnClick = () => {
    openDialog('project-time-entry-form', {
      projectId,
    });
  };

  // Handle the refresh button click.
  const handleRefreshBtnClick = () => {};

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <ProjectTransactionsSelect transactions={projectTranslations} onItemSelect={handleNewTransactionBtnClick} />
        <NavbarDivider />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'time-24'} iconSize={16} />}
          text={<T id={'projcet_details.action.time_entry'} />}
          onClick={handleTimeEntryBtnClick}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="pen-18" />}
          text={<T id={'projcet_details.action.edit_project'} />}
          onClick={handleEditProjectBtnClick}
        />
        <NavbarDivider />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'print-16'} iconSize={'16'} />}
          text={<T id={'print'} />}
        />
        <Button className={Classes.MINIMAL} icon={<Icon icon={'file-import-16'} />} text={<T id={'import'} />} />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'file-export-16'} iconSize={'16'} />}
          text={<T id={'export'} />}
        />
        <NavbarDivider />
        <DashboardRowsHeightButton initialValue={timesheetsTableSize} onChange={handleTableRowSizeChange} />
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
  withSettingsActions,
  withSettings(({ timesheetsSettings }) => ({
    timesheetsTableSize: timesheetsSettings?.tableSize,
  })),
)(ProjectDetailActionsBar);
