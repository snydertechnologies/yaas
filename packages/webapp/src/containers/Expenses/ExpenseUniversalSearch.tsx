// @ts-nocheck
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

/**
 * Universal search bill item select action.
 */
function ExpenseUniversalSearchItemSelectComponent({
  // #ownProps
  resourceType,
  resourceId,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.EXPENSE) {
    openDrawer(DRAWERS.EXPENSE_DETAILS, { expenseId: resourceId });
  }
  return null;
}

export const ExpenseUniversalSearchItemSelect = withDrawerActions(ExpenseUniversalSearchItemSelectComponent);
