import { T, TotalLine, TotalLineBorderStyle, TotalLineTextStyle, TotalLines } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useEstimateTotals } from './utils';

export function EstimateFormFooterRight() {
  const { formattedSubtotal, formattedTotal } = useEstimateTotals();

  return (
    <EstimateTotalLines labelColWidth={'180px'} amountColWidth={'180px'}>
      <TotalLine
        title={<T id={'estimate_form.label.subtotal'} />}
        value={formattedSubtotal}
        borderStyle={TotalLineBorderStyle.None}
      />
      <TotalLine
        title={<T id={'estimate_form.label.total'} />}
        value={formattedTotal}
        textStyle={TotalLineTextStyle.Bold}
      />
    </EstimateTotalLines>
  );
}

const EstimateTotalLines = styled(TotalLines)`
  width: 100%;
  color: #555555;
`;
