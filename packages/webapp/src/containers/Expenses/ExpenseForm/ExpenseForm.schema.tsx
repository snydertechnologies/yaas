import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import { isBlank } from '@bigcapital/webapp/utils';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  beneficiary: Yup.string().label(intl.get('beneficiary')),
  payment_account_id: Yup.number().required().label(intl.get('payment_account_')),
  payment_date: Yup.date().required().label(intl.get('payment_date_')),
  reference_no: Yup.string().min(1).max(DATATYPES_LENGTH.STRING).nullable(),
  currency_code: Yup.string().nullable().max(3).label(intl.get('currency_code')),
  description: Yup.string().trim().min(1).max(DATATYPES_LENGTH.TEXT).nullable().label(intl.get('description')),
  publish: Yup.boolean(),
  categories: Yup.array().of(
    Yup.object().shape({
      index: Yup.number().min(1).max(DATATYPES_LENGTH.INT_10).nullable(),
      amount: Yup.number().nullable(),
      expense_account_id: Yup.number()
        .nullable()
        .when(['amount'], {
          is: (amount) => !isBlank(amount),
          then: Yup.number().required(),
        }),
      landed_cost: Yup.boolean(),
      description: Yup.string().max(DATATYPES_LENGTH.TEXT).nullable(),
      project_id: Yup.number().nullable(),
    }),
  ),
});

export const CreateExpenseFormSchema = Schema;
export const EditExpenseFormSchema = Schema;
