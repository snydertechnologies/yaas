import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const CurrencyFormDialogContent = lazy(() => import('./CurrencyFormDialogContent'));

/**
 * Currency form dialog.
 */
function CurrencyFormDialog({ dialogName, payload = { action: '', id: null, currency: '' }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={payload.action === 'edit' ? <T id={'edit_currency'} /> : <T id={'new_currency'} />}
      className={'dialog--currency-form'}
      isOpen={isOpen}
      autoFocus={true}
      canEscapeKeyClose={true}
      style={{ width: '400px' }}
    >
      <DialogSuspense>
        <CurrencyFormDialogContent dialogName={dialogName} currencyCode={payload.currency} action={payload.action} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(CurrencyFormDialog);
