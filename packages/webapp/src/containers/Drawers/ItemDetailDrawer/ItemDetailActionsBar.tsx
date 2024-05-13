import { Button, Classes, Intent, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { AbilitySubject, ItemAction } from '@bigcapital/webapp/constants/abilityOption';
import { useItemDetailDrawerContext } from './ItemDetailDrawerProvider';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { Can, DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { ItemDetailActionsMoreBtn } from './ItemDetailActionsMoreBtn';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Item action-bar of readonly details drawer.
 */
function ItemDetailActionsBar({
  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  // Item readonly drawer context.
  const { itemId } = useItemDetailDrawerContext();

  const history = useHistory();

  // Handle edit item.
  const handleEditItem = () => {
    history.push(`/items/${itemId}/edit`);
    closeDrawer(DRAWERS.ITEM_DETAILS);
  };

  // Handle delete item.
  const handleDeleteItem = () => {
    openAlert('item-delete', { itemId });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Can I={ItemAction.Edit} a={AbilitySubject.Item}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="pen-18" />}
            text={<T id={'edit_item'} />}
            onClick={handleEditItem}
          />
        </Can>
        <Can I={ItemAction.Delete} a={AbilitySubject.Item}>
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleDeleteItem}
          />
        </Can>
        <ItemDetailActionsMoreBtn />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(withDrawerActions, withAlertsActions)(ItemDetailActionsBar);
