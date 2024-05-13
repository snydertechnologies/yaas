import { If } from '@bigcapital/webapp/components';
import { Button } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import FinancialLoadingBar from '../FinancialLoadingBar';
import { useUnrealizedGainOrLossContext } from './UnrealizedGainOrLossProvider';

/**
 * Unrealized Gain or Loss loading bar.
 */
export function UnrealizedGainOrLossLoadingBar() {
  return (
    <If condition={false}>
      <FinancialLoadingBar />
    </If>
  );
}
