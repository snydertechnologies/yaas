// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { FinancialSheet, ReportDataTable } from '@bigcapital/webapp/components';
import { useInventoryItemDetailsContext } from './InventoryItemDetailsProvider';
import { useInventoryItemDetailsColumns } from './components';

import { TableStyle } from '@bigcapital/webapp/constants';
import { defaultExpanderReducer, tableRowTypesToClassnames } from '@bigcapital/webapp/utils';

/**
 * Inventory item detail table.
 */
export function InventoryItemDetailsTable({
  // #ownProps
  companyName,
}) {
  const {
    inventoryItemDetails: { tableRows },
    isInventoryItemDetailsLoading,
    query,
  } = useInventoryItemDetailsContext();

  const columns = useInventoryItemDetailsColumns();

  const expandedRows = useMemo(() => defaultExpanderReducer(tableRows, 4), [tableRows]);

  return (
    <FinancialSheet
      companyName={companyName}
      sheetType={intl.get('inventory_item_details')}
      loading={isInventoryItemDetailsLoading}
      fromDate={query.fromDate}
      toDate={query.toDate}
      fullWidth={true}
    >
      <InventoryItemDetailsDataTable
        columns={columns}
        data={tableRows}
        rowClassNames={tableRowTypesToClassnames}
        noInitialFetch={true}
        expandable={true}
        expanded={expandedRows}
        expandToggleColumn={1}
        expandColumnSpace={0.8}
        sticky={true}
        styleName={TableStyle.Constrant}
      />
    </FinancialSheet>
  );
}

const InventoryItemDetailsDataTable = styled(ReportDataTable)`
  .table {
    .tbody {
      .tr .td {
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
      }

      .tr:not(.no-results) .td:not(:first-of-type) {
        border-left: 1px solid #ececec;
      }

      .tr:last-child .td {
        border-bottom: 1px solid #ddd;
      }

      .tr.row_type {
        &--ITEM {
          .td {
            &.transaction_type {
              border-left-color: transparent;
            }

            &.date {
              .cell-inner {
                white-space: nowrap;
                position: relative;
              }
            }
          }
          &:not(:first-child).is-expanded .td {
            border-top: 1px solid #ddd;
          }
        }

        &--ITEM,
        &--OPENING_ENTRY,
        &--CLOSING_ENTRY {
          font-weight: 500;
        }

        &--ITEM {
          &.is-expanded {
            .td.value .cell-inner {
              display: none;
            }
          }
        }
      }
    }
  }
`;
