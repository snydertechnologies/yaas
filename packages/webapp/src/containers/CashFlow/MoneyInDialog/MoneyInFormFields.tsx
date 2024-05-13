import { Classes } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import { If } from '@bigcapital/webapp/components';
import MoneyInContentFields from './MoneyInContentFields';
import { useMoneyInDailogContext } from './MoneyInDialogProvider';
import TransactionTypeFields from './TransactionTypeFields';

/**
 * Money in form fields.
 */
function MoneyInFormFields() {
  // Money in dialog context.
  const { defaultAccountId } = useMoneyInDailogContext();

  return (
    <div className={Classes.DIALOG_BODY}>
      {!defaultAccountId && <TransactionTypeFields />}
      <MoneyInContentFields />
    </div>
  );
}

export default MoneyInFormFields;
