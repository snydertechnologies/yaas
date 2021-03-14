import React from 'react';
import {
  Menu,
  MenuDivider,
  MenuItem,
  Intent,
  Tag,
  Position,
  Button,
  Popover,
} from '@blueprintjs/core';
import { useIntl, FormattedMessage as T } from 'react-intl';
import { formatMessage } from 'services/intl';
import { isNumber } from 'lodash';
import { Icon, Money, If } from 'components';
import { isBlank, safeCallback } from 'utils';

/**
 * Publish accessor
 */
export const PublishAccessor = (r) => {
  return r.is_published ? (
    <Tag minimal={true}>
      <T id={'published'} />
    </Tag>
  ) : (
    <Tag minimal={true} intent={Intent.WARNING}>
      <T id={'draft'} />
    </Tag>
  );
};

export const TypeAccessor = (row) => {
  return row.type ? (
    <Tag minimal={true} round={true} intent={Intent.NONE}>
      {formatMessage({ id: row.type })}
    </Tag>
  ) : (
    ''
  );
};

export const ItemCodeAccessor = (row) =>
  row.type ? (
    <Tag minimal={true} round={true} intent={Intent.NONE}>
      {formatMessage({ id: row.type })}
    </Tag>
  ) : (
    ''
  );

export const QuantityOnHandCell = ({ cell: { value } }) => {
  return isNumber(value) ? (
    <span className={value < 0 ? 'quantity_on_hand' : null}>{value}</span>
  ) : null;
};

export const CostPriceCell = ({ cell: { value } }) => {
  return !isBlank(value) ? <Money amount={value} currency={'USD'} /> : null;
};

export const SellPriceCell = ({ cell: { value } }) => {
  return !isBlank(value) ? <Money amount={value} currency={'USD'} /> : null;
};

export const ItemTypeAccessor = (row) => {
  return row.type ? (
    <Tag minimal={true} round={true} intent={Intent.NONE}>
      {formatMessage({ id: row.type })}
    </Tag>
  ) : null;
};

export function ItemsActionMenuList({
  row: { original },
  payload: {
    onEditItem,
    onInactivateItem,
    onActivateItem,
    onMakeAdjustment,
    onDeleteItem,
    onDuplicate,
  },
}) {
  const { formatMessage } = useIntl();
  return (
    <Menu>
      <MenuItem
        icon={<Icon icon="reader-18" />}
        text={<T id={'view_details'} />}
      />
      <MenuDivider />
      <MenuItem
        icon={<Icon icon="pen-18" />}
        text={formatMessage({ id: 'edit_item' })}
        onClick={safeCallback(onEditItem, original)}
      />
      <MenuItem
        icon={<Icon icon="duplicate-16" />}
        text={formatMessage({ id: 'duplicate' })}
        onClick={safeCallback(onDuplicate, original)}
      />
      <If condition={original.active}>
        <MenuItem
          text={formatMessage({ id: 'inactivate_item' })}
          icon={<Icon icon="pause-16" iconSize={16} />}
          onClick={safeCallback(onInactivateItem, original)}
        />
      </If>
      <If condition={!original.active}>
        <MenuItem
          text={formatMessage({ id: 'activate_item' })}
          icon={<Icon icon="play-16" iconSize={16} />}
          onClick={safeCallback(onActivateItem, original)}
        />
      </If>
      <If condition={original.type === 'inventory'}>
        <MenuItem
          text={formatMessage({ id: 'make_adjustment' })}
          icon={<Icon icon={'swap-vert'} iconSize={16} />}
          onClick={safeCallback(onMakeAdjustment, original)}
        />
      </If>
      <MenuItem
        text={formatMessage({ id: 'delete_item' })}
        icon={<Icon icon="trash-16" iconSize={16} />}
        onClick={safeCallback(onDeleteItem, original)}
        intent={Intent.DANGER}
      />
    </Menu>
  );
}

export const ItemsActionsTableCell = (props) => {
  return (
    <Popover
      position={Position.RIGHT_BOTTOM}
      content={<ItemsActionMenuList {...props} />}
    >
      <Button icon={<Icon icon="more-h-16" iconSize={16} />} />
    </Popover>
  );
};

/**
 * Retrieve all items table columns.
 */
export const useItemsTableColumns = () => {
  const { formatMessage } = useIntl();

  return React.useMemo(
    () => [
      {
        id: 'name',
        Header: formatMessage({ id: 'item_name' }),
        accessor: 'name',
        className: 'name',
        width: 180,
      },
      {
        id: 'code',
        Header: formatMessage({ id: 'item_code' }),
        accessor: 'code',
        className: 'code',
        width: 120,
      },
      {
        id: 'type',
        Header: formatMessage({ id: 'item_type' }),
        accessor: ItemTypeAccessor,
        className: 'item_type',
        width: 120,
      },
      {
        id: 'category',
        Header: formatMessage({ id: 'category' }),
        accessor: 'category.name',
        className: 'category',
        width: 150,
      },
      {
        id: 'sell_price',
        Header: formatMessage({ id: 'sell_price' }),
        Cell: SellPriceCell,
        accessor: 'sell_price',
        className: 'sell-price',
        width: 150,
      },
      {
        id: 'cost_price',
        Header: formatMessage({ id: 'cost_price' }),
        Cell: CostPriceCell,
        accessor: 'cost_price',
        className: 'cost-price',
        width: 150,
      },
      {
        id: 'quantity_on_hand',
        Header: formatMessage({ id: 'quantity_on_hand' }),
        accessor: 'quantity_on_hand',
        Cell: QuantityOnHandCell,
        width: 140,
      },
      {
        id: 'actions',
        Cell: ItemsActionsTableCell,
        width: 60,
        skeletonWidthMin: 100,
      },
    ],
    [formatMessage],
  );
};