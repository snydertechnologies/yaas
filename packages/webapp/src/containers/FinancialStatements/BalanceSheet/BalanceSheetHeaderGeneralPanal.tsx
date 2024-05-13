// @ts-nocheck
import React from 'react';

import { Col, Row } from '@bigcapital/webapp/components';

import FinancialStatementDateRange from '../FinancialStatementDateRange';
import FinancialStatementsFilter from '../FinancialStatementsFilter';
import RadiosAccountingBasis from '../RadiosAccountingBasis';
import SelectDisplayColumnsBy from '../SelectDisplayColumnsBy';

/**
 * Balance sheet header - General panal.
 */
export default function BalanceSheetHeaderGeneralTab({}) {
  return (
    <div>
      <FinancialStatementDateRange />
      <SelectDisplayColumnsBy />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter initialSelectedItem={'all-accounts'} />
        </Col>
      </Row>
      <RadiosAccountingBasis key={'basis'} />
    </div>
  );
}
