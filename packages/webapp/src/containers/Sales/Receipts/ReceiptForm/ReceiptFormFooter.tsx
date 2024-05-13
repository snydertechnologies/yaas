import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { ReceiptFormFooterLeft } from './ReceiptFormFooterLeft';
import { ReceiptFormFooterRight } from './ReceiptFormFooterRight';

export default function ReceiptFormFooter({}) {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <ReceiptFooterPaper>
        <Row>
          <Col md={8}>
            <ReceiptFormFooterLeft />
          </Col>

          <Col md={4}>
            <ReceiptFormFooterRight />
          </Col>
        </Row>
      </ReceiptFooterPaper>
    </div>
  );
}

const ReceiptFooterPaper = styled(Paper)`
  padding: 20px;
`;
