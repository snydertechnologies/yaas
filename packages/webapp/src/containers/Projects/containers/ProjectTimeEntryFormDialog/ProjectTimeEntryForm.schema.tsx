import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  date: Yup.date().label(intl.get('project_time_entry.schema.label.date')).required(),
  description: Yup.string().nullable().max(DATATYPES_LENGTH.TEXT),
  duration: Yup.string().label(intl.get('project_time_entry.schema.label.duration')).required(),
});

export const CreateProjectTimeEntryFormSchema = Schema;
