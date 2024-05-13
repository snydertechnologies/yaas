import { DataTable } from '@bigcapital/webapp/components';
import { useKeywordShortcuts } from '@bigcapital/webapp/hooks/dashboard';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';

/**
 *  keyboard shortcuts table.
 */
export default function ShortcutsTable() {
  const keywordShortcuts = useKeywordShortcuts();

  const columns = useMemo(
    () => [
      {
        Header: intl.get('shortcut_keys'),
        accessor: 'shortcut_key',
        disableSortBy: true,
        className: 'shortcut_key',
        width: 100,
      },
      {
        id: 'description',
        Header: intl.get('description'),
        accessor: 'description',
        disableSortBy: true,
        className: 'description',
        width: 250,
      },
    ],
    [],
  );
  return <DataTable columns={columns} data={keywordShortcuts} />;
}
