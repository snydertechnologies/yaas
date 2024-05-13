import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Dialog } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Dialog/Dialog.scss';

function DialogComponent(props) {
  const { name, children, closeDialog, onClose } = props;

  const handleClose = (event) => {
    closeDialog(name);
    onClose && onClose(event);
  };
  return (
    <Dialog {...props} onClose={handleClose}>
      {children}
    </Dialog>
  );
}

const DialogRoot = compose(withDialogActions)(DialogComponent);

export { DialogRoot as Dialog };
