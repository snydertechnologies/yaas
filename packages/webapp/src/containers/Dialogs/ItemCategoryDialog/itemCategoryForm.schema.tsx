import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  name: Yup.string().required().max(DATATYPES_LENGTH.STRING).label(intl.get('category_name_')),
  description: Yup.string().trim().max(DATATYPES_LENGTH.TEXT).nullable(),
});

export const CreateItemCategoryFormSchema = Schema;
export const EditItemCategoryFormSchema = Schema;
