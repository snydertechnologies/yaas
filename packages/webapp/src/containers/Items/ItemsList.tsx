import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Items/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import { ItemsListProvider } from './ItemsListProvider';

import ItemsActionsBar from './ItemsActionsBar';
import ItemsDataTable from './ItemsDataTable';
import ItemsViewsTabs from './ItemsViewsTabs';

import withItems from './withItems';
import withItemsActions from './withItemsActions';

/**
 * Items list.
 */
function ItemsList({
  // #withItems
  itemsTableState,
  itemsTableStateChanged,

  // #withItemsActions
  resetItemsTableState,
}) {
  // Resets items table query state once the page unmount.
  React.useEffect(
    () => () => {
      resetItemsTableState();
    },
    [resetItemsTableState],
  );

  return (
    <ItemsListProvider tableState={itemsTableState} tableStateChanged={itemsTableStateChanged}>
      <ItemsActionsBar />

      <DashboardPageContent>
        <ItemsViewsTabs />
        <ItemsDataTable />
      </DashboardPageContent>
    </ItemsListProvider>
  );
}

export default compose(
  withItemsActions,
  withItems(({ itemsTableState, itemsTableStateChanged }) => ({
    itemsTableState,
    itemsTableStateChanged,
  })),
)(ItemsList);
