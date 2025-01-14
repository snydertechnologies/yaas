import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/ItemsCategories/List.scss';

import { DashboardContentTable, DashboardPageContent } from '@bigcapital/webapp/components';
import { ItemsCategoriesProvider } from './ItemsCategoriesProvider';

import ItemCategoriesTable from './ItemCategoriesTable';
import ItemsCategoryActionsBar from './ItemsCategoryActionsBar';
import withItemsCategories from './withItemCategories';

/**
 * Item categories list.
 */
function ItemCategoryList({
  // #withItemsCategories
  itemsCategoriesTableState,
}) {
  return (
    <ItemsCategoriesProvider tableState={itemsCategoriesTableState}>
      <ItemsCategoryActionsBar />

      <DashboardPageContent>
        <DashboardContentTable>
          <ItemCategoriesTable />
        </DashboardContentTable>
      </DashboardPageContent>
    </ItemsCategoriesProvider>
  );
}

export default R.compose(
  withItemsCategories(({ itemsCategoriesTableState }) => ({
    itemsCategoriesTableState,
  })),
)(ItemCategoryList);
