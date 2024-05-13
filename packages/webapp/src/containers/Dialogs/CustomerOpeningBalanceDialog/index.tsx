// @ts-nocheck
import React from 'react';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';

const CustomerOpeningBalanceDialogContent = React.lazy(() => import('./CustomerOpeningBalanceDialogContent'));

/**
 * Customer opening balance dialog.
 * @returns
 */
function CustomerOpeningBalanceDialog({ dialogName, payload: { customerId }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'customer_opening_balance.label'} />}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--customer-opening-balance'}
    >
      <DialogSuspense>
        <CustomerOpeningBalanceDialogContent customerId={customerId} dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(CustomerOpeningBalanceDialog);
