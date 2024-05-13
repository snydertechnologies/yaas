import { Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useCallback } from 'react';

function CurrenciesActions({ openDialog }) {
  const handleClickNewCurrency = useCallback(() => {
    openDialog('currency-form');
  }, [openDialog]);

  return (
    <div className="users-actions">
      <Button icon={<Icon icon="plus" iconSize={12} />} onClick={handleClickNewCurrency} intent={Intent.PRIMARY}>
        <T id={'new_currency'} />
      </Button>
    </div>
  );
}

export default compose(withDialogActions)(CurrenciesActions);
