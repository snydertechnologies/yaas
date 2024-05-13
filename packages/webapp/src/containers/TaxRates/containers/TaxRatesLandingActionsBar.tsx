import { Can, DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, TaxRateAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Tax rates actions bar.
 */
function TaxRatesActionsBar({
  // #withDialogActions
  openDialog,
}) {
  // Handle `new item` button click.
  const onClickNewItem = () => {
    openDialog(DialogsName.TaxRateForm);
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Can I={TaxRateAction.Create} a={AbilitySubject.TaxRate}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="plus" />}
            text={'New Tax Rate'}
            onClick={onClickNewItem}
          />
        </Can>
        <NavbarDivider />

        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-import-16" iconSize={16} />}
          text={<T id={'import'} />}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(withDialogActions)(TaxRatesActionsBar);
