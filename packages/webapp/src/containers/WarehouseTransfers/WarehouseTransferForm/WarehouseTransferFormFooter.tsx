import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { Col, Paper, Row } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { WarehouseTransferFormFooterLeft } from './WarehouseTransferFormFooterLeft';

export default function WarehouseTransferFormFooter() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_FOOTER)}>
      <WarehousesTransferFooterPaper>
        <Row>
          <Col md={8}>
            <WarehouseTransferFormFooterLeft />
          </Col>
        </Row>
      </WarehousesTransferFooterPaper>
    </div>
  );
}

const WarehousesTransferFooterPaper = styled(Paper)`
  padding: 20px;
`;
