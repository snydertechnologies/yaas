import { AppToaster } from '@bigcapital/webapp/components';
import { Intent } from '@blueprintjs/core';
import { first } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useFormikContext } from 'formik';
import { useQuickPaymentReceiveContext } from './QuickPaymentReceiveFormProvider';

export const defaultInitialValues = {
  customer_id: '',
  deposit_account_id: '',
  payment_receive_no: '',
  payment_date: moment(new Date()).format('YYYY-MM-DD'),
  reference_no: '',
  // statement: '',
  exchange_rate: 1,
  branch_id: '',
  entries: [{ invoice_id: '', payment_amount: '' }],
};

export const transformErrors = (errors, { setFieldError }) => {
  const getError = (errorType) => errors.find((e) => e.type === errorType);

  if (getError('PAYMENT_RECEIVE_NO_EXISTS')) {
    setFieldError('payment_receive_no', intl.get('payment_number_is_not_unique'));
  }
  if (getError('PAYMENT_RECEIVE_NO_REQUIRED')) {
    setFieldError('payment_receive_no', intl.get('payment_receive_number_required'));
  }
  if (getError('INVALID_PAYMENT_AMOUNT')) {
    setFieldError('payment_amount', intl.get('the_payment_amount_bigger_than_invoice_due_amount'));
  }
  if (getError('PAYMENT_ACCOUNT_CURRENCY_INVALID')) {
    AppToaster.show({
      message: intl.get('payment_Receive.error.payment_account_currency_invalid'),
      intent: Intent.DANGER,
    });
  }
};

export const useSetPrimaryBranchToForm = () => {
  const { setFieldValue } = useFormikContext();
  const { branches, isBranchesSuccess } = useQuickPaymentReceiveContext();

  React.useEffect(() => {
    if (isBranchesSuccess) {
      const primaryBranch = branches.find((b) => b.primary) || first(branches);

      if (primaryBranch) {
        setFieldValue('branch_id', primaryBranch.id);
      }
    }
  }, [isBranchesSuccess, setFieldValue, branches]);
};
