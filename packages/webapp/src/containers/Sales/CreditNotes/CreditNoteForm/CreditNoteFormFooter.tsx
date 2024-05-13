import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { CreditNoteFormFooterLeft } from './CreditNoteFormFooterLeft';
import { CreditNoteFormFooterRight } from './CreditNoteFormFooterRight';

/**
 * Credit note form footer.
 */
export default function CreditNoteFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <CreditNoteFooterPaper>
        <Row>
          <Col md={8}>
            <CreditNoteFormFooterLeft />
          </Col>

          <Col md={4}>
            <CreditNoteFormFooterRight />
          </Col>
        </Row>
      </CreditNoteFooterPaper>
    </div>
  );
}
const CreditNoteFooterPaper = styled(Paper)`
  padding: 20px;
`;
