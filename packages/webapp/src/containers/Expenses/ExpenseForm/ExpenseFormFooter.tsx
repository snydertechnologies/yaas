import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { ExpenseFormFooterLeft } from './ExpenseFormFooterLeft';
import { ExpenseFormFooterRight } from './ExpenseFormFooterRight';

export default function ExpenseFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <ExpensesFooterPaper>
        <Row>
          <Col md={8}>
            <ExpenseFormFooterLeft />
          </Col>

          <Col md={4}>
            <ExpenseFormFooterRight />
          </Col>
        </Row>
      </ExpensesFooterPaper>
    </div>
  );
}

const ExpensesFooterPaper = styled(Paper)`
  padding: 20px;
`;
