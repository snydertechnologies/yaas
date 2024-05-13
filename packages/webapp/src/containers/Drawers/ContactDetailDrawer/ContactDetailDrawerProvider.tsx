import { DashboardInsider, DrawerHeaderContent } from '@bigcapital/webapp/components';
import { useContact } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const ContactDetailDrawerContext = React.createContext();

/**
 * Contact detail provider.
 */
function ContactDetailDrawerProvider({ contactId, ...props }) {
  // Handle fetch contact duplicate details.
  const { data: contact, isLoading: isContactLoading } = useContact(contactId, {
    enabled: !!contactId,
  });
  //provider.
  const provider = {
    contact,
    contactId,
  };

  return (
    <DashboardInsider loading={isContactLoading}>
      <DrawerHeaderContent name="contact-detail-drawer" title={contact?.display_name} />

      <ContactDetailDrawerContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useContactDetailDrawerContext = () => React.useContext(ContactDetailDrawerContext);

export { ContactDetailDrawerProvider, useContactDetailDrawerContext };
