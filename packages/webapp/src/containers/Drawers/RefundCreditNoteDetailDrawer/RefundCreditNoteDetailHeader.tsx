import { defaultTo } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { CommercialDocHeader, DetailItem, DetailsMenu, FormatDate } from '@bigcapital/webapp/components';

import { useRefundCreditNoteDrawerContext } from './RefundCreditNoteDrawerProvider';

export default function RefundCreditNoteDetailHeader() {
  const { refundCreditTransaction } = useRefundCreditNoteDrawerContext();

  return (
    <CommercialDocHeader>
      <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
        <DetailItem label={intl.get('date')} children={<FormatDate value={refundCreditTransaction.formatted_date} />} />
        <DetailItem label={intl.get('refund_credit.drawer.label.amount')}>
          <strong>{refundCreditTransaction.formtted_amount}</strong>
        </DetailItem>
        <DetailItem
          label={intl.get('refund_credit.drawer.label.credit_note_no')}
          children={refundCreditTransaction.credit_note?.credit_note_number}
        />

        <DetailItem
          label={intl.get('refund_credit.drawer.label.withdrawal_account')}
          children={refundCreditTransaction.from_account.name}
        />
        <DetailItem label={intl.get('refund_credit.drawer.label.reference_no')}>
          {defaultTo(refundCreditTransaction.reference_no, '—')}
        </DetailItem>
        <DetailItem label={intl.get('refund_credit.drawer.label.description')}>
          {defaultTo(refundCreditTransaction.description, '—')}
        </DetailItem>
      </DetailsMenu>
    </CommercialDocHeader>
  );
}
