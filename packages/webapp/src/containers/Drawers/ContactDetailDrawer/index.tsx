import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const ContactDetailDrawerContent = React.lazy(() => import('./ContactDetailDrawerContent'));

/**
 * Contact detail drawer.
 */
function ContactDetailDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { contactId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'750px'}>
      <DrawerSuspense>
        <ContactDetailDrawerContent contact={contactId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(ContactDetailDrawer);
