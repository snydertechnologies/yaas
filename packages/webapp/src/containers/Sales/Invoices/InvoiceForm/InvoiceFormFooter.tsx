import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { InvoiceFormFooterLeft } from './InvoiceFormFooterLeft';
import { InvoiceFormFooterRight } from './InvoiceFormFooterRight';

export default function InvoiceFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <InvoiceFooterPaper>
        <Row>
          <Col md={8}>
            <InvoiceFormFooterLeft />
          </Col>

          <Col md={4}>
            <InvoiceFormFooterRight />
          </Col>
        </Row>
      </InvoiceFooterPaper>
    </div>
  );
}

const InvoiceFooterPaper = styled(Paper)`
  padding: 20px;
`;
