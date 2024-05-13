import classNames from 'classnames';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';

import { PageFormBigNumber } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import ReceiptFormHeaderFields from './ReceiptFormHeaderFields';

import { getEntriesTotal } from '@bigcapital/webapp/containers/Entries/utils';

/**
 * Receipt form header section.
 */
function ReceiptFormHeader({
  // #ownProps
  onReceiptNumberChanged,
}) {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <ReceiptFormHeaderFields onReceiptNumberChanged={onReceiptNumberChanged} />
      <ReceiptFormHeaderBigTotal />
    </div>
  );
}

/**
 * The big total amount of receipt form.
 * @returns {React.ReactNode}
 */
function ReceiptFormHeaderBigTotal() {
  const {
    values: { currency_code, entries },
  } = useFormikContext();

  // Calculate the total due amount of bill entries.
  const totalDueAmount = useMemo(() => getEntriesTotal(entries), [entries]);

  return <PageFormBigNumber label={intl.get('due_amount')} amount={totalDueAmount} currencyCode={currency_code} />;
}

export default ReceiptFormHeader;
