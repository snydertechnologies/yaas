import { Alert } from '@bigcapital/webapp/components';
import { Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

export function TaxRateFormDialogFormErrors() {
  const { errors } = useFormikContext();

  if (!errors.confirm_edit) return null;

  return <Alert intent={Intent.DANGER}>{errors.confirm_edit}</Alert>;
}
