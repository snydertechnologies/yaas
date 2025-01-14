// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { DataTable, TableSkeletonRows } from '@bigcapital/webapp/components';

import { useItemsCategoriesContext } from './ItemsCategoriesProvider';
import { ActionMenuList, useItemsCategoriesTableColumns } from './components';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Items categories table.
 */
function ItemsCategoryTable({
  // #ownProps
  tableProps,

  // #withDialogActions
  openDialog,

  // #withAlertActions
  openAlert,
}) {
  // Items categories context.
  const { isCategoriesLoading, isCategoriesFetching, itemsCategories } = useItemsCategoriesContext();

  // Table columns.
  const columns = useItemsCategoriesTableColumns();

  // Handle delete Item.
  const handleDeleteCategory = ({ id }) => {
    openAlert('item-category-delete', { itemCategoryId: id });
  };

  // Handle Edit item category.
  const handleEditCategory = (category) => {
    openDialog('item-category-form', { action: 'edit', id: category.id });
  };

  return (
    <DataTable
      noInitialFetch={true}
      columns={columns}
      data={itemsCategories}
      loading={isCategoriesLoading}
      headerLoading={isCategoriesLoading}
      progressBarLoading={isCategoriesFetching}
      expandable={false}
      sticky={true}
      selectionColumn={true}
      TableLoadingRenderer={TableSkeletonRows}
      noResults={intl.get('there_is_no_items_categories_in_table_yet')}
      payload={{
        onDeleteCategory: handleDeleteCategory,
        onEditCategory: handleEditCategory,
      }}
      ContextMenu={ActionMenuList}
      {...tableProps}
    />
  );
}

export default compose(withDialogActions, withAlertActions)(ItemsCategoryTable);
