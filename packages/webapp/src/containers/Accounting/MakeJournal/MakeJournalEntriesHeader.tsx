import { PageFormBigNumber, FormattedMessage as T } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { safeSumBy } from '@bigcapital/webapp/utils';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import MakeJournalEntriesHeaderFields from './MakeJournalEntriesHeaderFields';

export default function MakeJournalEntriesHeader() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <MakeJournalEntriesHeaderFields />
      <MakeJournalHeaderBigNumber />
    </div>
  );
}

/**
 * Big total number of make journal header.
 * @returns {React.ReactNode}
 */
function MakeJournalHeaderBigNumber() {
  const {
    values: { entries, currency_code },
  } = useFormikContext();
  const totalCredit = safeSumBy(entries, 'credit');
  const totalDebit = safeSumBy(entries, 'debit');

  const total = Math.max(totalCredit, totalDebit);

  return <PageFormBigNumber label={<T id={'amount'} />} amount={total} currencyCode={currency_code} />;
}
