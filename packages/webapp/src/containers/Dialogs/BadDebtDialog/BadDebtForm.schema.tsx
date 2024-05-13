import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  expense_account_id: Yup.number().required().label(intl.get('expense_account_id')),
  amount: Yup.number().required().label(intl.get('amount')),
  reason: Yup.string().required().min(3).max(DATATYPES_LENGTH.TEXT).label(intl.get('reason')),
});

export const CreateBadDebtFormSchema = Schema;
