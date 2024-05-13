import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Card, DrawerLoading } from '@bigcapital/webapp/components';
import CustomerFormFormik, {
  CustomerFormHeaderPrimary,
} from '@bigcapital/webapp/containers/Customers/CustomerForm/CustomerFormFormik';
import {
  CustomerFormProvider,
  useCustomerFormContext,
} from '@bigcapital/webapp/containers/Customers/CustomerForm/CustomerFormProvider';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

/**
 * Drawer customer form loading wrapper.
 * @returns {JSX}
 */
function DrawerCustomerFormLoading({ children }) {
  const { isFormLoading } = useCustomerFormContext();

  return <DrawerLoading loading={isFormLoading}>{children}</DrawerLoading>;
}

/**
 * Quick customer form of the drawer.
 */
function QuickCustomerFormDrawer({ displayName, closeDrawer, customerId }) {
  // Handle the form submit request success.
  const handleSubmitSuccess = () => {
    closeDrawer(DRAWERS.QUICK_CREATE_CUSTOMER);
  };
  // Handle the form cancel action.
  const handleCancelForm = () => {
    closeDrawer(DRAWERS.QUICK_CREATE_CUSTOMER);
  };

  return (
    <CustomerFormProvider customerId={customerId}>
      <DrawerCustomerFormLoading>
        <CustomerFormCard>
          <CustomerFormFormik
            initialValues={{ display_name: displayName }}
            onSubmitSuccess={handleSubmitSuccess}
            onCancel={handleCancelForm}
          />
        </CustomerFormCard>
      </DrawerCustomerFormLoading>
    </CustomerFormProvider>
  );
}

export default R.compose(withDrawerActions)(QuickCustomerFormDrawer);

const CustomerFormCard = styled(Card)`
  margin: 15px;
  padding: 25px;
  margin-bottom: calc(15px + 65px);

  ${CustomerFormHeaderPrimary} {
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
