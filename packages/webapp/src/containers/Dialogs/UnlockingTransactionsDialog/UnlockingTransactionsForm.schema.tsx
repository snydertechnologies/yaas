import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  module: Yup.string().required(),
  reason: Yup.string().required().min(3).max(DATATYPES_LENGTH.TEXT).label(intl.get('reason')),
});
export const CreateUnlockingTransactionsFormSchema = Schema;
