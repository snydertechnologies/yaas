import keyboardShortcuts from '@bigcapital/webapp/constants/keyboardShortcutsOptions';
// @ts-nocheck
import React from 'react';
import { useAbilitiesFilter } from '../utils/useAbilityContext';

/**
 * Retrieve the filtered keyword shortcuts.
 */
export const useKeywordShortcuts = () => {
  const abilitiesFilter = useAbilitiesFilter();

  return React.useMemo(() => abilitiesFilter(keyboardShortcuts), [abilitiesFilter]);
};
