// @ts-nocheck
import React from 'react';

import { Col, Row } from '@bigcapital/webapp/components';
import FinancialStatementDateRange from '../FinancialStatementDateRange';
import FinancialStatementsFilter from '../FinancialStatementsFilter';
import RadiosAccountingBasis from '../RadiosAccountingBasis';
import SelectDisplayColumnsBy from '../SelectDisplayColumnsBy';

/**
 * Profit/Loss sheet - Drawer header - General panel.
 */
export default function ProfitLossSheetHeaderGeneralPane({}) {
  return (
    <div>
      <FinancialStatementDateRange />
      <SelectDisplayColumnsBy />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter initialSelectedItem={'with-transactions'} />
        </Col>
      </Row>
      <RadiosAccountingBasis key={'basis'} />
    </div>
  );
}
