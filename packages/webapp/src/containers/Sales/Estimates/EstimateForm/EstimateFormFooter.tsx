import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { EstimateFormFooterLeft } from './EstimateFormFooterLeft';
import { EstimateFormFooterRight } from './EstimateFormFooterRight';

/**
 * Estimate form footer.
 */
export default function EstiamteFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <EstimateFooterPaper>
        <Row>
          <Col md={8}>
            <EstimateFormFooterLeft />
          </Col>

          <Col md={4}>
            <EstimateFormFooterRight />
          </Col>
        </Row>
      </EstimateFooterPaper>
    </div>
  );
}

const EstimateFooterPaper = styled(Paper)`
  padding: 20px;
`;
