import { Money } from '@bigcapital/webapp/components';
import { FormattedMessage as T } from '@bigcapital/webapp/components';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { sumBy } from 'lodash';
// @ts-nocheck
import React, { useMemo } from 'react';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import PaymentReceiveHeaderFields from './PaymentReceiveHeaderFields';

/**
 * Payment receive form header.
 */
function PaymentReceiveFormHeader() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <div className={classNames(CLASSES.PAGE_FORM_HEADER_PRIMARY)}>
        <PaymentReceiveHeaderFields />
        <PaymentReceiveFormBigTotal />
      </div>
    </div>
  );
}

/**
 * Big total amount of payment receive form.
 * @returns {React.ReactNode}
 */
function PaymentReceiveFormBigTotal() {
  // Formik form context.
  const {
    values: { currency_code, entries },
  } = useFormikContext();

  // Calculates the total payment amount from due amount.
  const paymentFullAmount = useMemo(() => sumBy(entries, 'payment_amount'), [entries]);

  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER_BIG_NUMBERS)}>
      <div className="big-amount">
        <span className="big-amount__label">
          <T id={'amount_received'} />
        </span>
        <h1 className="big-amount__number">
          <Money amount={paymentFullAmount} currency={currency_code} />
        </h1>
      </div>
    </div>
  );
}

export default PaymentReceiveFormHeader;
