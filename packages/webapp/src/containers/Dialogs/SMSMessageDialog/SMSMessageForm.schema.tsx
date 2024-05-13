import { DATATYPES_LENGTH } from '@bigcapital/webapp/constants/dataTypes';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  notification_key: Yup.string().required(),
  is_notification_enabled: Yup.boolean(),
  message_text: Yup.string().min(3).max(DATATYPES_LENGTH.TEXT),
});

export const CreateSMSMessageFormSchema = Schema;
