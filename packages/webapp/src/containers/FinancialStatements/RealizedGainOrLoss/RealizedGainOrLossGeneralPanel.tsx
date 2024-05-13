// @ts-nocheck
import React from 'react';

import { Col, Row } from '@bigcapital/webapp/components';
import FinancialStatementDateRange from '../FinancialStatementDateRange';
import SelectDisplayColumnsBy from '../SelectDisplayColumnsBy';

/**
 * Realized Gain or Loss header - General panel.
 */
export default function RealizedGainOrLossGeneralPanel() {
  return (
    <div>
      <FinancialStatementDateRange />
      <SelectDisplayColumnsBy />
    </div>
  );
}
