import { Skeleton } from '@bigcapital/webapp/components';
import clsx from 'classnames';
// @ts-nocheck
import React, { useContext } from 'react';
import TableContext from './TableContext';

function TableHeaderCell({ column }) {
  const { skeletonWidthMax = 100, skeletonWidthMin = 40 } = column;

  return (
    <div
      {...column.getHeaderProps({
        className: clsx(
          'th',
          {
            [`align-${column.align}`]: column.align,
          },
          column.className,
        ),
      })}
    >
      <Skeleton minWidth={skeletonWidthMin} maxWidth={skeletonWidthMax} />
    </div>
  );
}

/**
 * Table skeleton rows.
 */
export function TableSkeletonHeader({}) {
  const {
    table: { headerGroups },
  } = useContext(TableContext);

  return (
    <div className="thead">
      {headerGroups.map((headerGroup) => (
        <div
          {...headerGroup.getHeaderGroupProps({
            className: 'tr',
          })}
        >
          {headerGroup.headers.map((column) => (
            <TableHeaderCell column={column} />
          ))}
        </div>
      ))}
    </div>
  );
}
