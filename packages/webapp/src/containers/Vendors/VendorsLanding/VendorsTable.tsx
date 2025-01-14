// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router';

import {
  DashboardContentTable,
  DataTable,
  TableSkeletonHeader,
  TableSkeletonRows,
} from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';

import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import VendorsEmptyStatus from './VendorsEmptyStatus';
import { useVendorsListContext } from './VendorsListProvider';
import { ActionsMenu, useVendorsTableColumns } from './components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withVendors from './withVendors';
import withVendorsActions from './withVendorsActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Vendors table.
 */
function VendorsTable({
  // #withVendorsActions
  setVendorsTableState,

  // #withVendors
  vendorsTableState,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  openDrawer,

  // #withDialogActions
  openDialog,

  // #withSettings
  vendorsTableSize,
}) {
  // Vendors list context.
  const { vendors, pagination, isVendorsFetching, isVendorsLoading, isEmptyStatus } = useVendorsListContext();

  // Vendors table columns.
  const columns = useVendorsTableColumns();

  // History context.
  const history = useHistory();

  // Handle edit vendor data table
  const handleEditVendor = (vendor) => {
    history.push(`/vendors/${vendor.id}/edit`);
  };

  // Handle cancel/confirm inactive.
  const handleInactiveVendor = ({ id, contact_service }) => {
    openAlert('vendor-inactivate', {
      vendorId: id,
      service: contact_service,
    });
  };

  // Handle cancel/confirm activate.
  const handleActivateVendor = ({ id, contact_service }) => {
    openAlert('vendor-activate', { vendorId: id, service: contact_service });
  };

  // Handle click delete vendor.
  const handleDeleteVendor = ({ id }) => {
    openAlert('vendor-delete', { contactId: id });
  };

  // Handle contact duplicate .
  const handleContactDuplicate = ({ id }) => {
    openDialog('contact-duplicate', {
      contactId: id,
    });
  };

  // Handle view detail item.
  const handleViewDetailVendor = ({ id }) => {
    openDrawer(DRAWERS.VENDOR_DETAILS, { vendorId: id });
  };

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.VENDOR_DETAILS, { vendorId: cell.row.original.id });
  };

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.VENDORS);

  // Handle fetch data once the page index, size or sort by of the table change.
  const handleFetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      setVendorsTableState({
        pageIndex,
        pageSize,
        sortBy,
      });
    },
    [setVendorsTableState],
  );

  // Display empty status instead of the table.
  if (isEmptyStatus) {
    return <VendorsEmptyStatus />;
  }

  return (
    <DashboardContentTable>
      <DataTable
        noInitialFetch={true}
        columns={columns}
        data={vendors}
        loading={isVendorsLoading}
        headerLoading={isVendorsLoading}
        progressBarLoading={isVendorsFetching}
        onFetchData={handleFetchData}
        selectionColumn={true}
        expandable={false}
        sticky={true}
        pagination={true}
        manualSortBy={true}
        pagesCount={pagination.pagesCount}
        autoResetSortBy={false}
        autoResetPage={false}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={ActionsMenu}
        onCellClick={handleCellClick}
        initialColumnsWidths={initialColumnsWidths}
        onColumnResizing={handleColumnResizing}
        size={vendorsTableSize}
        payload={{
          onEdit: handleEditVendor,
          onDelete: handleDeleteVendor,
          onDuplicate: handleContactDuplicate,
          onInactivate: handleInactiveVendor,
          onActivate: handleActivateVendor,
          onViewDetails: handleViewDetailVendor,
        }}
      />
    </DashboardContentTable>
  );
}

export default compose(
  withVendorsActions,
  withAlertsActions,
  withDialogActions,
  withDrawerActions,

  withVendors(({ vendorsTableState }) => ({ vendorsTableState })),
  withSettings(({ vendorsSettings }) => ({
    vendorsTableSize: vendorsSettings?.tableSize,
  })),
)(VendorsTable);
