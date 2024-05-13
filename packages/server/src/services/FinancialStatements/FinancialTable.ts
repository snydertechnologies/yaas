import { ITableColumn } from '@bigcapital/server/interfaces';
import { ITableRow } from '@bigcapital/server/interfaces';
import { increment } from '@bigcapital/server/utils';
import { clone, cloneDeep, isEmpty, omit } from 'lodash';
import * as R from 'ramda';
import { IROW_TYPE } from './BalanceSheet/constants';

export const FinancialTable = (Base) =>
  class extends Base {
    /**
     * Table columns cell indexing.
     * @param   {ITableColumn[]} columns
     * @returns {ITableColumn[]}
     */
    public tableColumnsCellIndexing = (columns: ITableColumn[]): ITableColumn[] => {
      const cellIndex = increment(-1);

      return this.mapNodesDeep(columns, (column) => {
        return isEmpty(column.children) ? R.assoc('cellIndex', cellIndex(), column) : column;
      });
    };

    addTotalRow = (node: ITableRow) => {
      const clonedNode = clone(node);

      if (clonedNode.children) {
        const cells = cloneDeep(node.cells);
        cells[0].value = this.i18n.__('financial_sheet.total_row', {
          value: cells[0].value,
        });

        clonedNode.children.push({
          ...omit(clonedNode, 'children'),
          cells,
          rowTypes: [IROW_TYPE.TOTAL],
        });
      }
      return clonedNode;
    };

    private addTotalRows = (nodes: ITableRow[]) => {
      return this.mapNodesDeep(nodes, this.addTotalRow);
    };
  };
