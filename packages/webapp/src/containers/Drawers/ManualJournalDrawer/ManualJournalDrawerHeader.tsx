import { defaultTo } from 'lodash';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import {
  Col,
  CommercialDocHeader,
  CommercialDocTopHeader,
  DetailItem,
  DetailsMenu,
  Row,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { useManualJournalDrawerContext } from './ManualJournalDrawerProvider';
import { ManualJournalDetailsStatus } from './utils';

/**
 * Manual journal details header.
 */
export default function ManualJournalDrawerHeader() {
  const { manualJournal } = useManualJournalDrawerContext();

  return (
    <CommercialDocHeader>
      <CommercialDocTopHeader>
        <DetailsMenu>
          <DetailItem name={'total'} label={<T id={'total'} />}>
            <h3 className="big-number">{manualJournal.formatted_amount}</h3>
          </DetailItem>

          <StatusDetailItem>
            <ManualJournalDetailsStatus manualJournal={manualJournal} />
          </StatusDetailItem>
        </DetailsMenu>
      </CommercialDocTopHeader>

      <Row>
        <Col xs={6}>
          <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
            <DetailItem name={'journal-type'} label={<T id={'journal_type'} />}>
              {manualJournal.journal_type}
            </DetailItem>

            <DetailItem name={'journal-number'} label={<T id={'journal_no'} />}>
              {manualJournal.journal_number}
            </DetailItem>

            <DetailItem name={'reference-no'} label={<T id={'reference_no'} />}>
              {defaultTo(manualJournal.reference, '-')}
            </DetailItem>

            <DetailItem name={'currency'} label={<T id={'currency'} />}>
              {manualJournal.currency_code}
            </DetailItem>

            <DetailItem label={<T id={'description'} />}>{defaultTo(manualJournal.description, '—')}</DetailItem>
          </DetailsMenu>
        </Col>
      </Row>
    </CommercialDocHeader>
  );
}

const StatusDetailItem = styled(DetailItem)`
  width: 50%;
  text-align: right;
  position: relative;
  top: -5px;
`;
