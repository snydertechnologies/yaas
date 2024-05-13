import { AbilityContext } from '@bigcapital/webapp/components';
import { useAbility } from '@casl/react';
// @ts-nocheck
import React from 'react';

export const useAbilityContext = () => useAbility(AbilityContext);

/**
 *
 */
export const useAbilitiesFilter = () => {
  const ability = useAbilityContext();

  return React.useCallback(
    (items) => {
      return items.filter((item) => !item.permission || ability.can(item.permission.ability, item.permission.subject));
    },
    [ability],
  );
};
