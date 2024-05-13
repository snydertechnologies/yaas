import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { PaymentReceiveFormFootetLeft } from './PaymentReceiveFormFootetLeft';
import { PaymentReceiveFormFootetRight } from './PaymentReceiveFormFootetRight';

/**
 * Payment receive form footer.
 */
export default function PaymentReceiveFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <PaymentReceiveFooterPaper>
        <Row>
          <Col md={8}>
            <PaymentReceiveFormFootetLeft />
          </Col>

          <Col md={4}>
            <PaymentReceiveFormFootetRight />
          </Col>
        </Row>
      </PaymentReceiveFooterPaper>
    </div>
  );
}

const PaymentReceiveFooterPaper = styled(Paper)`
  padding: 20px;
`;
