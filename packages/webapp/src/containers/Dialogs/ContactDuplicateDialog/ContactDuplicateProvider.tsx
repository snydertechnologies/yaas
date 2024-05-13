import { DialogContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

const ContactDuplicateContext = React.createContext();

/**
 *  contact duplicate provider.
 */
function ContactDuplicateProvider({ contactId, dialogName, ...props }) {
  // Provider state.
  const provider = {
    dialogName,
    contactId,
  };

  return (
    <DialogContent name={'contact-duplicate'}>
      <ContactDuplicateContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useContactDuplicateFromContext = () => React.useContext(ContactDuplicateContext);

export { ContactDuplicateProvider, useContactDuplicateFromContext };
