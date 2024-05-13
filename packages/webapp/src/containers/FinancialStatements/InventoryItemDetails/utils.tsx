// @ts-nocheck
import * as R from 'ramda';

import { Align } from '@bigcapital/webapp/constants';
import { getColumnWidth } from '@bigcapital/webapp/utils';

const itemNameOrDateColumn = R.curry((data, index, column) => ({
  id: column.key,
  key: column.key,
  Header: column.label,
  accessor: `cells[${index}].value`,
  className: column.key,
  width: getColumnWidth(data, `cells.${index}.key`, {
    minWidth: 130,
    magicSpacing: 10,
  }),
  disableSortBy: true,
}));

const numericColumn = R.curry((data, index, column) => ({
  id: column.key,
  key: column.key,
  Header: column.label,
  accessor: `cells[${index}].value`,
  className: column.key,
  width: getColumnWidth(data, `cells.${index}.key`, {
    minWidth: 130,
    magicSpacing: 10,
  }),
  disableSortBy: true,
  align: Align.Right,
}));

const columnsMapper = R.curry((data, index, column) => ({
  id: column.key,
  key: column.key,
  Header: column.label,
  accessor: `cells[${index}].value`,
  className: column.key,
  width: getColumnWidth(data, `cells.${index}.key`, {
    minWidth: 130,
    magicSpacing: 10,
  }),
  disableSortBy: true,
  textOverview: true,
}));

/**
 * Inventory item details columns.
 */
export const dynamicColumns = (columns, data) => {
  const mapper = (column, index) => {
    return R.compose(
      R.cond([
        [R.pathEq(['key'], 'date'), itemNameOrDateColumn(data, index)],
        [R.pathEq(['key'], 'running_quantity'), numericColumn(data, index)],
        [R.pathEq(['key'], 'profit_margin'), numericColumn(data, index)],
        [R.pathEq(['key'], 'running_value'), numericColumn(data, index)],
        [R.pathEq(['key'], 'quantity'), numericColumn(data, index)],
        [R.pathEq(['key'], 'rate'), numericColumn(data, index)],
        [R.pathEq(['key'], 'total'), numericColumn(data, index)],
        [R.pathEq(['key'], 'value'), numericColumn(data, index)],
        [R.T, columnsMapper(data, index)],
      ]),
    )(column);
  };
  return columns.map(mapper);
};
