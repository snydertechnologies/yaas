import { DataTable, TableSkeletonHeader, TableSkeletonRows } from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { ActionMenu } from './components';
import { useProjectPurchasesColumns } from './hooks';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Project Purchases DataTable.
 * @returns
 */
function ProjectPurchasesTableRoot({
  // #withSettings
  purchasesTableSize,
}) {
  // Retrieve purchases table columns.
  const columns = useProjectPurchasesColumns();

  // Handle delete purchase.
  const handleDeletePurchase = () => {};

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.PURCHASES);

  return (
    <DataTable
      columns={columns}
      data={[]}
      manualSortBy={true}
      selectionColumn={true}
      noInitialFetch={true}
      sticky={true}
      ContextMenu={ActionMenu}
      TableLoadingRenderer={TableSkeletonRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      size={purchasesTableSize}
      payload={{
        onDelete: handleDeletePurchase,
      }}
    />
  );
}
export const ProjectPurchasesTable = compose(
  withSettings(({ purchasesSettings }) => ({
    purchasesTableSize: purchasesSettings?.tableSize,
  })),
)(ProjectPurchasesTableRoot);
