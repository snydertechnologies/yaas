// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TableStyle } from '@bigcapital/webapp/constants';
import { Card, DataTable, If } from '@bigcapital/webapp/components';
import { AccountDrawerTableOptionsProvider } from './AccountDrawerTableOptionsProvider';
import { AccountDrawerTableHeader } from './AccountDrawerTableHeader';

import { useAccountReadEntriesColumns } from './utils';
import { useAppIntlContext } from '@bigcapital/webapp/components/AppIntlProvider';
import { useAccountDrawerContext } from './AccountDrawerProvider';

import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * account drawer table.
 */
function AccountDrawerTable({ closeDrawer }) {
  const { accounts, drawerName } = useAccountDrawerContext();

  // Handle view more link click.
  const handleLinkClick = () => {
    closeDrawer(drawerName);
  };
  // Application intl context.
  const { isRTL } = useAppIntlContext();

  return (
    <Card>
      <AccountDrawerTableOptionsProvider>
        <AccountDrawerTableHeader />
        <AccountDrawerDataTable />

        <If condition={accounts.length > 0}>
          <TableFooter>
            <Link to={`/financial-reports/general-ledger`} onClick={handleLinkClick}>
              {isRTL ? '→' : '←'} {intl.get('view_more_transactions')}
            </Link>
          </TableFooter>
        </If>
      </AccountDrawerTableOptionsProvider>
    </Card>
  );
}

function AccountDrawerDataTable() {
  const { account, accounts } = useAccountDrawerContext();

  // Account read-only entries table columns.
  const columns = useAccountReadEntriesColumns();

  return <DataTable columns={columns} data={accounts} payload={{ account }} styleName={TableStyle.Constrant} />;
}

export default compose(withDrawerActions)(AccountDrawerTable);

const TableFooter = styled.div`
  padding: 6px 14px;
  display: block;
  border-top: 1px solid #d2dde2;
  border-bottom: 1px solid #d2dde2;
  font-size: 12px;
`;
