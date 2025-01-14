// @ts-nocheck
import React from 'react';
import { Tab } from '@blueprintjs/core';

import { DrawerMainTabs, FormattedMessage as T } from '@bigcapital/webapp/components';
import { ItemPaymentTransactions } from './ItemPaymentTransactions';
import ItemDetailHeader from './ItemDetailHeader';
import WarehousesLocationsTable from './WarehousesLocations';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';

export default function ItemDetailTab() {
  const { featureCan } = useFeatureCan();

  return (
    <DrawerMainTabs renderActiveTabPanelOnly={true}>
      <Tab id={'overview'} title={<T id={'overview'} />} panel={<ItemDetailHeader />} />
      <Tab id={'transactions'} title={<T id={'transactions'} />} panel={<ItemPaymentTransactions />} />
      {featureCan(Features.Warehouses) && (
        <Tab id={'warehouses'} title={<T id={'warehouse_locations.label'} />} panel={<WarehousesLocationsTable />} />
      )}
    </DrawerMainTabs>
  );
}
