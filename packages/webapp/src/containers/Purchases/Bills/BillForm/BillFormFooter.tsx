import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { BillFormFooterLeft } from './BillFormFooterLeft';
import { BillFormFooterRight } from './BillFormFooterRight';

// Bill form floating actions.
export default function BillFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <BillFooterPaper>
        <Row>
          <Col md={8}>
            <BillFormFooterLeft />
          </Col>

          <Col md={4}>
            <BillFormFooterRight />
          </Col>
        </Row>
      </BillFooterPaper>
    </div>
  );
}

const BillFooterPaper = styled(Paper)`
  padding: 20px;
`;
