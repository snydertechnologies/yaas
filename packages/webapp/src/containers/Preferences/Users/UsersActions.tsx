// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent } from '@blueprintjs/core';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

function UsersActions({ openDialog, closeDialog }) {
  const history = useHistory();
  const onClickNewUser = () => {
    openDialog('invite-user');
  };

  const onClickNewRole = () => {
    history.push('/preferences/roles');
  };

  return (
    <div className="preferences-actions">
      <Button icon={<Icon icon="plus" iconSize={12} />} onClick={onClickNewUser} intent={Intent.PRIMARY}>
        <T id={'invite_user'} />
      </Button>

      <Button icon={<Icon icon="plus" iconSize={12} />} onClick={onClickNewRole}>
        <T id={'new_role'} />
      </Button>
    </div>
  );
}

export default compose(withDialogActions)(UsersActions);
