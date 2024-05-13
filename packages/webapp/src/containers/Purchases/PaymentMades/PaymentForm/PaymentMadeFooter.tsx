import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { PaymentMadeFormFooterLeft } from './PaymentMadeFormFooterLeft';
import { PaymentMadeFormFooterRight } from './PaymentMadeFormFooterRight';

/**
 * Payment made form footer.
 */
export default function PaymentMadeFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <PaymentReceiveFooterPaper>
        <Row>
          <Col md={8}>
            <PaymentMadeFormFooterLeft />
          </Col>

          <Col md={4}>
            <PaymentMadeFormFooterRight />
          </Col>
        </Row>
      </PaymentReceiveFooterPaper>
    </div>
  );
}

const PaymentReceiveFooterPaper = styled(Paper)`
  padding: 20px;
`;
