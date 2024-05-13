import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { MakeJournalFormFooterLeft } from './MakeJournalFormFooterLeft';
import { MakeJournalFormFooterRight } from './MakeJournalFormFooterRight';

export default function MakeJournalFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <MakeJournalFooterPaper>
        <Row>
          <Col md={8}>
            <MakeJournalFormFooterLeft />
          </Col>

          <Col md={4}>
            <MakeJournalFormFooterRight />
          </Col>
        </Row>
      </MakeJournalFooterPaper>
    </div>
  );
}
const MakeJournalFooterPaper = styled(Paper)`
  padding: 20px;
`;
