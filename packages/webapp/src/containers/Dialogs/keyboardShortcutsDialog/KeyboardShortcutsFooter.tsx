import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

function KeyboardShortcutsFooter({
  // #withDialogActions
  closeDialog,
}) {
  const handleClose = () => {
    closeDialog('keyboard-shortcuts');
  };

  return (
    <div className={'dialog--keyboard-shortcuts__footer'}>
      <Button intent={Intent.PRIMARY} onClick={handleClose} small={true}>
        <T id={'oK_'} />
      </Button>
    </div>
  );
}

export default compose(withDialogActions)(KeyboardShortcutsFooter);
