import { Classes } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { AccountsMultiSelect, Col, FFormGroup, Row, FormattedMessage as T } from '@bigcapital/webapp/components';

import FinancialStatementDateRange from '../FinancialStatementDateRange';
import FinancialStatementsFilter from '../FinancialStatementsFilter';
import RadiosAccountingBasis from '../RadiosAccountingBasis';

import { useGLGeneralPanelContext } from './GLHeaderGeneralPaneProvider';
import { GLHeaderGeneralPanelProvider } from './GLHeaderGeneralPaneProvider';
import { filterAccountsOptions } from './common';

/**
 * General ledger (GL) - Header - General panel.
 */
export default function GLHeaderGeneralPane() {
  return (
    <GLHeaderGeneralPanelProvider>
      <GLHeaderGeneralPaneContent />
    </GLHeaderGeneralPanelProvider>
  );
}

/**
 * General ledger (GL) - Header - General panel - content.
 */
function GLHeaderGeneralPaneContent() {
  const { accounts } = useGLGeneralPanelContext();

  return (
    <React.Fragment>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FinancialStatementsFilter items={filterAccountsOptions} initialSelectedItem={'with-transactions'} />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <FFormGroup label={<T id={'specific_accounts'} />} name={'accountsIds'} className={Classes.FILL}>
            <AccountsMultiSelect name="accountsIds" items={accounts} />
          </FFormGroup>
        </Col>
      </Row>

      <RadiosAccountingBasis key={'basis'} />
    </React.Fragment>
  );
}
