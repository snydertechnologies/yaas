import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Card, DrawerLoading } from '@bigcapital/webapp/components';

import ItemFormFormik from '../../Items/ItemFormFormik';
import { ItemFormProvider, useItemFormContext } from '../../Items/ItemFormProvider';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { useDrawerContext } from '@bigcapital/webapp/components/Drawer/DrawerProvider';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';

/**
 * Quick create/edit item drawer form.
 */
function QuickCreateItemDrawerForm({
  itemId,
  itemName,
  closeDrawer,

  // #withDashboardActions
  addQuickActionEvent,
}) {
  // Drawer context.
  const { payload } = useDrawerContext();

  // Handle the form submit request success.
  const handleSubmitSuccess = (values, form, submitPayload, response) => {
    if (submitPayload.redirect) {
      closeDrawer(DRAWERS.QUICK_CREATE_ITEM);
    }
    if (payload.quickActionEvent) {
      addQuickActionEvent(payload.quickActionEvent, {
        itemId: response.data.id,
      });
    }
  };
  // Handle the form cancel.
  const handleFormCancel = () => {
    closeDrawer(DRAWERS.QUICK_CREATE_ITEM);
  };

  return (
    <ItemFormProvider itemId={itemId}>
      <DrawerItemFormLoading>
        <ItemFormCard>
          <ItemFormFormik
            initialValues={{ name: itemName }}
            onSubmitSuccess={handleSubmitSuccess}
            onCancel={handleFormCancel}
          />
        </ItemFormCard>
      </DrawerItemFormLoading>
    </ItemFormProvider>
  );
}

/**
 * Drawer item form loading.
 * @returns {JSX}
 */
function DrawerItemFormLoading({ children }) {
  const { isFormLoading } = useItemFormContext();

  return <DrawerLoading loading={isFormLoading}>{children}</DrawerLoading>;
}

export default R.compose(withDrawerActions, withDashboardActions)(QuickCreateItemDrawerForm);

const ItemFormCard = styled(Card)`
  margin: 15px;
  padding: 25px;
  margin-bottom: calc(15px + 65px);

  .page-form {
    padding: 0;

    &__floating-actions {
      margin-left: -41px;
      margin-right: -41px;
    }
  }
`;
