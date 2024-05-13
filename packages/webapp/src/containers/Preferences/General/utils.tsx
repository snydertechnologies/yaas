// @ts-nocheck
import { defaultFastFieldShouldUpdate } from '@bigcapital/webapp/utils';

export const shouldBaseCurrencyUpdate = (newProps, oldProps) => {
  return (
    newProps.baseCurrencyDisabled !== oldProps.baseCurrencyDisabled || defaultFastFieldShouldUpdate(newProps, oldProps)
  );
};
