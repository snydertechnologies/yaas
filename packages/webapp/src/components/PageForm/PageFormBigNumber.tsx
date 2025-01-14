import { Money } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/BigAmount.scss';

export function PageFormBigNumber({ label, amount, currencyCode }) {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER_BIG_NUMBERS)}>
      <div className="big-amount">
        <span className="big-amount__label">{label}</span>
        <h1 className="big-amount__number">
          <Money amount={amount} currency={currencyCode} />
        </h1>
      </div>
    </div>
  );
}
