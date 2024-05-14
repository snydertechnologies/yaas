import { Features, IFeatureConfiugration } from '@bigcapital/libs-backend';
import config from '@bigcapital/server/config';
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
