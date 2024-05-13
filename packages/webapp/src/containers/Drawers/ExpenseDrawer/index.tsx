import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React, { lazy } from 'react';

import { compose } from '@bigcapital/webapp/utils';

const ExpenseDrawerContent = lazy(() => import('./ExpenseDrawerContent'));

/**
 * Expense drawer.
 */
function ExpenseDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { expenseId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'65%'} style={{ minWidth: '700px', maxWidth: '900px' }}>
      <DrawerSuspense>
        <ExpenseDrawerContent expenseId={expenseId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(ExpenseDrawer);
