import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const MoneyInDialogContent = React.lazy(() => import('./MoneyInDialogContent'));

/**
 * Money In dialog.
 */
function MoneyInDialog({ dialogName, payload = { account_type: null, account_id: null, account_name: '' }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={intl.get('cash_flow_transaction.money_in', {
        value: payload.account_name,
      })}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--money-in'}
    >
      <DialogSuspense>
        <MoneyInDialogContent
          dialogName={dialogName}
          accountId={payload.account_id}
          accountType={payload.account_type}
        />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(MoneyInDialog);
