// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Drawers/ItemDrawer.scss';

import { DrawerBody } from '@bigcapital/webapp/components';
import ItemContentDetails from './ItemContentDetails';
import { ItemDetailDrawerProvider } from './ItemDetailDrawerProvider';

/**
 * Item detail drawer content.
 */
export default function ItemDetailDrawerContent({
  // #ownProp
  itemId,
}) {
  return (
    <ItemDetailDrawerProvider itemId={itemId}>
      <DrawerBody>
        <ItemContentDetails />
      </DrawerBody>
    </ItemDetailDrawerProvider>
  );
}
