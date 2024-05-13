import { Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { AppToaster } from '@bigcapital/webapp/components';

/**
 * Transformes the response errors types.
 */
export const transformErrors = (errors, { setErrors }) => {
  if (errors.some(({ type }) => type === 'SALE_INVOICE_ALREADY_WRITTEN_OFF')) {
    AppToaster.show({
      message: 'SALE_INVOICE_ALREADY_WRITTEN_OFF',
      // message: intl.get(''),
      intent: Intent.DANGER,
    });
  }
};
