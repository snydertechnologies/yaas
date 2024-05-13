// @ts-nocheck
import React from 'react';

import { Col, Row } from '@bigcapital/webapp/components';
import FinancialStatementDateRange from '../FinancialStatementDateRange';
import FinancialStatementsFilter from '../FinancialStatementsFilter';
import RadiosAccountingBasis from '../RadiosAccountingBasis';

/**
 * Trial balance sheet - Drawer header - General panel.
 */
export default function TrialBalanceSheetHeaderGeneralPanel({}) {
  return (
    <div>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter initialSelectedItem={'with-transactions'} />
        </Col>
      </Row>
      <RadiosAccountingBasis />
    </div>
  );
}
