import { Classes, FormGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useCallback } from 'react';

import { PaymentReceiveListField } from '@bigcapital/webapp/components';
import { CellType } from '@bigcapital/webapp/constants';
function PaymentReceiveListFieldCell({
  column: { id },
  row: { index },
  cell: { value: initialValue },
  payload: { invoices, updateData, errors },
}) {
  const handleInvoicesSelected = useCallback(
    (_item) => {
      updateData(index, id, _item.id);
    },
    [updateData, index, id],
  );

  const error = errors?.[index]?.[id];

  return (
    <FormGroup intent={error ? Intent.DANGER : null} className={classNames('form-group--selcet-list', Classes.FILL)}>
      <PaymentReceiveListField
        invoices={invoices}
        onInvoiceSelected={handleInvoicesSelected}
        selectedInvoiceId={initialValue}
      />
    </FormGroup>
  );
}

PaymentReceiveListFieldCell.cellType = CellType.Field;

export default PaymentReceiveListFieldCell;
