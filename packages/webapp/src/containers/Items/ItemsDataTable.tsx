import { FormattedMessage as T } from '@bigcapital/webapp/components';
import {
  DashboardContentTable,
  DataTable,
  TableSkeletonHeader,
  TableSkeletonRows,
} from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import ItemsEmptyStatus from './ItemsEmptyStatus';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withItemsActions from './withItemsActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { compose } from '@bigcapital/webapp/utils';
import { useItemsListContext } from './ItemsListProvider';
import { ItemsActionMenuList, useItemsTableColumns } from './components';

/**
 * Items datatable.
 */
function ItemsDataTable({
  // #withItemsActions
  setItemsTableState,

  // #withDialogAction
  openDialog,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  openDrawer,

  // #withSettings
  itemsTableSize,

  // #ownProps
  tableProps,
}) {
  // Items list context.
  const { items, pagination, isItemsLoading, isEmptyStatus, isItemsFetching } = useItemsListContext();

  // Datatable columns.
  const columns = useItemsTableColumns();

  // History context.
  const history = useHistory();

  // Table row class names.
  const rowClassNames = (row) => ({
    inactive: !row.original.active,
  });

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.ITEMS);

  // Handle fetch data once the page index, size or sort by of the table change.
  const handleFetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      setItemsTableState({
        pageIndex,
        pageSize,
        sortBy,
      });
    },
    [setItemsTableState],
  );

  // Handle delete action Item.
  const handleDeleteItem = ({ id }) => {
    openAlert('item-delete', { itemId: id });
  };

  // Handle cancel/confirm item inactive.
  const handleInactiveItem = ({ id }) => {
    openAlert('item-inactivate', { itemId: id });
  };

  // Handle cancel/confirm item activate.
  const handleActivateItem = ({ id }) => {
    openAlert('item-activate', { itemId: id });
  };

  // Handle Edit item.
  const handleEditItem = ({ id }) => {
    history.push(`/items/${id}/edit`);
  };

  // Handle item make adjustment.
  const handleMakeAdjustment = ({ id }) => {
    openDialog('inventory-adjustment', { itemId: id });
  };

  // Display empty status instead of the table.
  const handleDuplicate = ({ id }) => {
    history.push(`/items/new?duplicate=${id}`, { action: id });
  };

  // Handle view detail item.
  const handleViewDetailItem = ({ id }) => {
    openDrawer(DRAWERS.ITEM_DETAILS, { itemId: id });
  };

  // Cannot continue in case the items has empty status.
  if (isEmptyStatus) {
    return <ItemsEmptyStatus />;
  }

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.ITEM_DETAILS, { itemId: cell.row.original.id });
  };

  return (
    <DashboardContentTable>
      <DataTable
        columns={columns}
        data={items}
        loading={isItemsLoading}
        headerLoading={isItemsLoading}
        progressBarLoading={isItemsFetching}
        noInitialFetch={true}
        selectionColumn={true}
        spinnerProps={{ size: 30 }}
        expandable={false}
        sticky={true}
        rowClassNames={rowClassNames}
        pagination={true}
        manualSortBy={true}
        manualPagination={true}
        pagesCount={pagination.pagesCount}
        autoResetSortBy={false}
        autoResetPage={true}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={ItemsActionMenuList}
        onFetchData={handleFetchData}
        onCellClick={handleCellClick}
        initialColumnsWidths={initialColumnsWidths}
        onColumnResizing={handleColumnResizing}
        size={itemsTableSize}
        payload={{
          onDeleteItem: handleDeleteItem,
          onEditItem: handleEditItem,
          onInactivateItem: handleInactiveItem,
          onActivateItem: handleActivateItem,
          onMakeAdjustment: handleMakeAdjustment,
          onDuplicate: handleDuplicate,
          onViewDetails: handleViewDetailItem,
        }}
        noResults={<T id={'there_is_no_items_in_the_table_yet'} />}
        {...tableProps}
      />
    </DashboardContentTable>
  );
}

export default compose(
  withItemsActions,
  withAlertsActions,
  withDrawerActions,
  withDialogActions,
  withSettings(({ itemsSettings }) => ({
    itemsTableSize: itemsSettings.tableSize,
  })),
)(ItemsDataTable);
