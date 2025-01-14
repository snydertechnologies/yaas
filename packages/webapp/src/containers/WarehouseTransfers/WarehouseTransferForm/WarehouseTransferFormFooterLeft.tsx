import { FEditableText, FFormGroup, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

export function WarehouseTransferFormFooterLeft() {
  return (
    <React.Fragment>
      {/* --------- Terms and conditions --------- */}
      <TermsConditsFormGroup label={<T id={'warehouse_transfer.form.reason.label'} />} name={'reason'}>
        <FEditableText name={'reason'} placeholder={intl.get('warehouse_transfer.form.reason.placeholder')} />
      </TermsConditsFormGroup>
    </React.Fragment>
  );
}

const TermsConditsFormGroup = styled(FFormGroup)`
  &.bp4-form-group {
    .bp4-label {
      font-size: 12px;
      margin-bottom: 12px;
    }
    .bp4-form-content {
      margin-left: 10px;
    }
  }
`;
