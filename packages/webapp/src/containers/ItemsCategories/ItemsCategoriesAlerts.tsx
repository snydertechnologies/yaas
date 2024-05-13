// @ts-nocheck
import React from 'react';

const ItemCategoryDeleteAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/Items/ItemCategoryDeleteAlert'),
);

export default [{ name: 'item-category-delete', component: ItemCategoryDeleteAlert }];
