// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { CommercialDocBox } from '@bigcapital/webapp/components';

import ReceiptDetailFooter from './ReceiptDetailFooter';
import ReceiptDetailHeader from './ReceiptDetailHeader';
import ReceiptDetailTable from './ReceiptDetailTable';
import ReceiptDetailTableFooter from './ReceiptDetailTableFooter';

export default function ReceiptDetailTab() {
  return (
    <ReceiptDetailsOverviewRoot>
      <CommercialDocBox>
        <ReceiptDetailHeader />
        <ReceiptDetailTable />
        <ReceiptDetailTableFooter />
        <ReceiptDetailFooter />
      </CommercialDocBox>
    </ReceiptDetailsOverviewRoot>
  );
}

const ReceiptDetailsOverviewRoot = styled.div``;
