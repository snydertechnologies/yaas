import { MaterialProgressBar } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

/**
 * Financnail progress bar.
 */
export default function FinancialLoadingBar() {
  return (
    <div className={'financial-progressbar'}>
      <MaterialProgressBar />
    </div>
  );
}
