import { Intent, Tag } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { T } from '@bigcapital/webapp/components';

/**
 * Expense details status.
 * @returns {React.JSX}
 */
export function ExpenseDetailsStatus({ expense }) {
  return expense.is_published ? (
    <Tag round={true} minimal={true}>
      <T id={'published'} />
    </Tag>
  ) : (
    <Tag round={true} intent={Intent.WARNING}>
      <T id={'draft'} />
    </Tag>
  );
}
