import clsx from 'classnames';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { DetailItem, DetailsMenu, FormatDate } from '@bigcapital/webapp/components';
import { defaultTo } from 'lodash';
import { useInventoryAdjustmentDrawerContext } from './InventoryAdjustmentDrawerProvider';

import InventoryAdjustmentDrawerCls from '@bigcapital/webapp/style/components/Drawers/InventoryAdjustmentDrawer.module.scss';

/**
 * Inventory detail header.
 */
export default function InventoryAdjustmentDetailHeader() {
  const { inventoryAdjustment } = useInventoryAdjustmentDrawerContext();

  return (
    <div className={clsx(InventoryAdjustmentDrawerCls.detail_panel_header)}>
      <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
        <DetailItem label={intl.get('date')}>
          <FormatDate value={inventoryAdjustment.date} />
        </DetailItem>

        <DetailItem label={intl.get('type')}>{inventoryAdjustment.formatted_type}</DetailItem>

        <DetailItem label={intl.get('adjustment_account')}>{inventoryAdjustment.adjustment_account.name}</DetailItem>

        <DetailItem name={'reference'} label={intl.get('reference_no')}>
          {defaultTo(inventoryAdjustment.reference_no, '-')}
        </DetailItem>

        <DetailItem label={intl.get('published_at')}>
          <FormatDate value={inventoryAdjustment.published_at} />
        </DetailItem>

        <DetailItem label={intl.get('reason')}>{defaultTo(inventoryAdjustment.reason, '—')}</DetailItem>

        <DetailItem label={intl.get('created_at')}>
          <FormatDate value={inventoryAdjustment.created_at} />
        </DetailItem>
      </DetailsMenu>
    </div>
  );
}
