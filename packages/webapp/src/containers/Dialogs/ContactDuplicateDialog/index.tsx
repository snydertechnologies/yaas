import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const ContactDialogContent = lazy(() => import('./ContactDuplicateDialogContent'));
/**
 * Contact duplicate dialog.
 */
function ContactDuplicateDialog({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'duplicate_contact'} />}
      autoFocus={true}
      canEscapeKeyClose={true}
      className={'dialog--contact-duplicate'}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <ContactDialogContent dialogName={dialogName} contact={payload.contactId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(ContactDuplicateDialog);
