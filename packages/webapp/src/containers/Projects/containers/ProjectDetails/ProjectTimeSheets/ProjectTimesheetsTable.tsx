import { DataTable, TableSkeletonHeader, TableSkeletonRows } from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useProjectTimesheetContext } from './ProjectTimesheetsProvider';
import { ActionsMenu } from './components';
import { useProjectTimesheetColumns } from './hooks';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Timesheet DataTable.
 * @returns
 */
function ProjectTimesheetsTableRoot({
  // #withSettings
  timesheetsTableSize,

  // #withDialog
  openDialog,
  // #withAlertsActions
  openAlert,
}) {
  const { projectTimeEntries } = useProjectTimesheetContext();

  // Retrieve project timesheet table columns.
  const columns = useProjectTimesheetColumns();

  // Handle delete timesheet.
  const handleDeleteTimesheet = ({ id }) => {
    openAlert('project-timesheet-delete', { timesheetId: id });
  };
  // Handle edit timesheet.
  const handleEditTimesheet = ({ id }) => {
    openDialog('project-time-entry-form', { timesheetId: id, action: 'edit' });
  };
  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.TIMESHEETS);

  return (
    <ProjectTimesheetDataTable
      columns={columns}
      data={projectTimeEntries}
      manualSortBy={true}
      noInitialFetch={true}
      sticky={true}
      hideTableHeader={true}
      ContextMenu={ActionsMenu}
      TableLoadingRenderer={TableSkeletonRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      size={timesheetsTableSize}
      payload={{
        onDelete: handleDeleteTimesheet,
        onEdit: handleEditTimesheet,
      }}
    />
  );
}
export const ProjectTimesheetsTable = compose(
  withAlertsActions,
  withDialogActions,
  withSettings(({ timesheetsSettings }) => ({
    timesheetsTableSize: timesheetsSettings?.tableSize,
  })),
)(ProjectTimesheetsTableRoot);

const ProjectTimesheetDataTable = styled(DataTable)`
  .table {
    .thead .tr .th {
      .resizer {
        display: none;
      }
    }

    .tbody {
      .tr .td {
        padding-top: 0.7rem;
        padding-bottom: 0.7rem;

        &.td-name {
          padding-left: 1rem;
        }
        &.td-actions{
          padding-right: 1rem;
        }
      }

      .tr:last-of-type .td{
        border-bottom: 0;
      }
    }
  }
  .table-size--small {
    .tbody .tr {
      height: 45px;
    }
  }
`;
