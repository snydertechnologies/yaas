import config from '@bigcapital/server/config';
import { Features, IFeatureConfiugration } from '@bigcapital/server/interfaces';
import { defaultTo } from 'lodash';

export const FeaturesConfigure: IFeatureConfiugration[] = [
  {
    name: Features.BRANCHES,
    defaultValue: false,
  },
  {
    name: Features.WAREHOUSES,
    defaultValue: false,
  },
  {
    name: Features.BankSyncing,
    defaultValue: defaultTo(config.bankSync.enabled, false),
  },
];
