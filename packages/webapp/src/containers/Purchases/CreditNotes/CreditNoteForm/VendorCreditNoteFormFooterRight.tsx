import { T, TotalLine, TotalLineBorderStyle, TotalLineTextStyle, TotalLines } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useVendorCrditNoteTotals } from './utils';

export function VendorCreditNoteFormFooterRight() {
  const { formattedSubtotal, formattedTotal } = useVendorCrditNoteTotals();

  return (
    <VendorCreditNoteTotalLines labelColWidth={'180px'} amountColWidth={'180px'}>
      <TotalLine
        title={<T id={'vendor_credit_form.label.subtotal'} />}
        value={formattedSubtotal}
        borderStyle={TotalLineBorderStyle.None}
      />
      <TotalLine
        title={<T id={'vendor_credit_form.label.total'} />}
        value={formattedTotal}
        textStyle={TotalLineTextStyle.Bold}
      />
    </VendorCreditNoteTotalLines>
  );
}

const VendorCreditNoteTotalLines = styled(TotalLines)`
  width: 100%;
  color: #555555;
`;
