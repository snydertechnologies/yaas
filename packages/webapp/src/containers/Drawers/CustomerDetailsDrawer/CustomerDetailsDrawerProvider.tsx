import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useCustomer } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const ContactDetailDrawerContext = React.createContext();

/**
 * Contact detail provider.
 */
function CustomerDetailsDrawerProvider({ customerId, ...props }) {
  // Handle fetch customer details.
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(customerId, {
    enabled: !!customerId,
  });
  // Provider.
  const provider = {
    customer,
    customerId,
    isCustomerLoading,
  };

  return (
    <DrawerLoading loading={isCustomerLoading}>
      <DrawerHeaderContent name={DRAWERS.CUSTOMER_DETAILS} title={customer?.display_name} />
      <ContactDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useCustomerDetailsDrawerContext = () => React.useContext(ContactDetailDrawerContext);

export { CustomerDetailsDrawerProvider, useCustomerDetailsDrawerContext };
