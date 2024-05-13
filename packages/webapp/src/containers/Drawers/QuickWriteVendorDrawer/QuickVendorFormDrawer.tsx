import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Card, DrawerLoading } from '@bigcapital/webapp/components';
import VendorFormFormik, {
  VendorFormHeaderPrimary,
} from '@bigcapital/webapp/containers/Vendors/VendorForm/VendorFormFormik';
import {
  VendorFormProvider,
  useVendorFormContext,
} from '@bigcapital/webapp/containers/Vendors/VendorForm/VendorFormProvider';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { useDrawerContext } from '@bigcapital/webapp/components/Drawer/DrawerProvider';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';

/**
 * Drawer vendor form loading wrapper.
 * @returns {JSX}
 */
function DrawerVendorFormLoading({ children }) {
  const { isFormLoading } = useVendorFormContext();

  return <DrawerLoading loading={isFormLoading}>{children}</DrawerLoading>;
}

/**
 * Quick vendor form of the drawer.
 */
function QuickVendorFormDrawer({ displayName, closeDrawer, vendorId, addQuickActionEvent }) {
  const { payload } = useDrawerContext();

  // Handle the form submit request success.
  const handleSubmitSuccess = (values, form, submitPayload, response) => {
    if (!submitPayload.noRedirect) {
      closeDrawer(DRAWERS.QUICK_WRITE_VENDOR);
    }
    if (payload.quickActionEvent) {
      addQuickActionEvent(payload.quickActionEvent, {
        vendorId: response.data.id,
      });
    }
  };
  // Handle the form cancel action.
  const handleCancelForm = () => {
    closeDrawer(DRAWERS.QUICK_WRITE_VENDOR);
  };

  return (
    <VendorFormProvider vendorId={vendorId}>
      <DrawerVendorFormLoading>
        <VendorFormCard>
          <VendorFormFormik
            initialValues={{ display_name: displayName }}
            onSubmitSuccess={handleSubmitSuccess}
            onCancel={handleCancelForm}
          />
        </VendorFormCard>
      </DrawerVendorFormLoading>
    </VendorFormProvider>
  );
}

export default R.compose(withDrawerActions, withDashboardActions)(QuickVendorFormDrawer);

const VendorFormCard = styled(Card)`
  margin: 15px;
  padding: 25px;
  margin-bottom: calc(15px + 65px);

  ${VendorFormHeaderPrimary} {
    padding-top: 0;
  }
  .page-form {
    padding: 0;

    &__floating-actions {
      margin-left: -41px;
      margin-right: -41px;
    }
  }
`;
