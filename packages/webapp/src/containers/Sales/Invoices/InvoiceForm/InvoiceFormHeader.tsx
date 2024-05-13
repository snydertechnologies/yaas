import classNames from 'classnames';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import InvoiceFormHeaderFields from './InvoiceFormHeaderFields';

import { PageFormBigNumber } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useInvoiceSubtotal } from './utils';

/**
 * Invoice form header section.
 */
function InvoiceFormHeader() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <InvoiceFormHeaderFields />
      <InvoiceFormBigTotal />
    </div>
  );
}

/**
 * Big total of invoice form header.
 * @returns {React.ReactNode}
 */
function InvoiceFormBigTotal() {
  const {
    values: { currency_code },
  } = useFormikContext();

  // Calculate the total due amount of invoice entries.
  const totalDueAmount = useInvoiceSubtotal();

  return <PageFormBigNumber label={intl.get('due_amount')} amount={totalDueAmount} currencyCode={currency_code} />;
}
export default InvoiceFormHeader;
