import { Button, Intent, Menu, MenuDivider, MenuItem, Popover, Position } from '@blueprintjs/core';
import clsx from 'classnames';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Can, FormatDateCell, Icon, Money } from '@bigcapital/webapp/components';
import { AbilitySubject, PaymentReceiveAction } from '@bigcapital/webapp/constants/abilityOption';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { safeCallback } from '@bigcapital/webapp/utils';

/**
 * Table actions menu.
 */
export function ActionsMenu({
  row: { original: paymentReceive },
  payload: { onEdit, onDelete, onViewDetails, onSendMail },
}) {
  return (
    <Menu>
      <MenuItem
        icon={<Icon icon="reader-18" />}
        text={intl.get('view_details')}
        onClick={safeCallback(onViewDetails, paymentReceive)}
      />
      <MenuItem
        icon={<Icon icon={'envelope'} iconSize={16} />}
        text={'Send Mail'}
        onClick={safeCallback(onSendMail, paymentReceive)}
      />
      <Can I={PaymentReceiveAction.Edit} a={AbilitySubject.PaymentReceive}>
        <MenuDivider />
        <MenuItem
          icon={<Icon icon="pen-18" />}
          text={intl.get('edit_payment_receive')}
          onClick={safeCallback(onEdit, paymentReceive)}
        />
      </Can>
      <Can I={PaymentReceiveAction.Delete} a={AbilitySubject.PaymentReceive}>
        <MenuDivider />
        <MenuItem
          text={intl.get('delete_payment_receive')}
          intent={Intent.DANGER}
          onClick={safeCallback(onDelete, paymentReceive)}
          icon={<Icon icon="trash-16" iconSize={16} />}
        />
      </Can>
    </Menu>
  );
}

/**
 * Amount accessor.
 */
export function AmountAccessor(row) {
  return <Money amount={row.amount} currency={row.currency_code} />;
}

/**
 * Actions cell.
 */
export function ActionsCell(props) {
  return (
    <Popover content={<ActionsMenu {...props} />} position={Position.RIGHT_BOTTOM}>
      <Button icon={<Icon icon="more-h-16" iconSize={16} />} />
    </Popover>
  );
}

/**
 * Retrieve payment receives columns.
 */
export function usePaymentReceivesColumns() {
  return React.useMemo(
    () => [
      {
        id: 'payment_date',
        Header: intl.get('payment_date'),
        accessor: 'payment_date',
        Cell: FormatDateCell,
        width: 140,
        className: 'payment_date',
        clickable: true,
        textOverview: true,
      },
      {
        id: 'customer',
        Header: intl.get('customer_name'),
        accessor: 'customer.display_name',
        width: 160,
        className: 'customer_id',
        clickable: true,
        textOverview: true,
      },
      {
        id: 'amount',
        Header: intl.get('amount'),
        accessor: AmountAccessor,
        width: 120,
        align: 'right',
        clickable: true,
        textOverview: true,
        className: clsx(CLASSES.FONT_BOLD),
      },
      {
        id: 'payment_receive_no',
        Header: intl.get('payment_receive_no'),
        accessor: (row) => (row.payment_receive_no ? `${row.payment_receive_no}` : null),
        width: 140,
        className: 'payment_receive_no',
        clickable: true,
        textOverview: true,
      },
      {
        id: 'deposit_account',
        Header: intl.get('deposit_account'),
        accessor: 'deposit_account.name',
        width: 140,
        className: 'deposit_account_id',
        clickable: true,
        textOverview: true,
      },
      {
        id: 'reference_no',
        Header: intl.get('reference_no'),
        accessor: 'reference_no',
        width: 140,
        className: 'reference_no',
        clickable: true,
        textOverview: true,
      },
    ],
    [],
  );
}
