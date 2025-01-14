// @ts-nocheck
import React from 'react';
import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { useItem } from '@bigcapital/webapp/hooks/query';
import { inactiveStatus } from './utlis';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';

const ItemDetailDrawerContext = React.createContext();

/**
 * Item detail provider
 */
function ItemDetailDrawerProvider({ itemId, ...props }) {
  // transaction type payload.
  const [value, setValue] = React.useState('invoices');

  // Fetches the given item detail.
  const { isLoading: isItemLoading, data: item } = useItem(itemId, {
    enabled: !!itemId,
  });

  //provider.
  const provider = {
    item,
    itemId,
    isItemLoading,
    value,
    setValue,
  };

  return (
    <DrawerLoading loading={isItemLoading}>
      <DrawerHeaderContent name={DRAWERS.ITEM_DETAILS} title={inactiveStatus(item)} />
      <ItemDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}
const useItemDetailDrawerContext = () => React.useContext(ItemDetailDrawerContext);

export { ItemDetailDrawerProvider, useItemDetailDrawerContext };
