// @ts-nocheck
import React from 'react';

import { Col, Row } from '@bigcapital/webapp/components';
import FinancialStatementDateRange from '../FinancialStatementDateRange';
import SelectDisplayColumnsBy from '../SelectDisplayColumnsBy';

/**
 * Unrealized Gain or Loss header - General panel.
 */
export default function UnrealizedGainOrLossGeneralPanel() {
  return (
    <div>
      <FinancialStatementDateRange />
      <SelectDisplayColumnsBy />
    </div>
  );
}
