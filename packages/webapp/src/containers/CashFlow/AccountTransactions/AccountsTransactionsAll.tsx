// @ts-nocheck
import styled from 'styled-components';

import '@bigcapital/webapp/style/pages/CashFlow/AccountTransactions/List.scss';

import { AccountTransactionsAllProvider } from './AccountTransactionsAllBoot';
import AccountTransactionsDataTable from './AccountTransactionsDataTable';
import { AccountTransactionsUncategorizeFilter } from './AccountTransactionsUncategorizeFilter';

const Box = styled.div`
  margin: 30px 15px;
`;

const CashflowTransactionsTableCard = styled.div`
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  padding: 30px 18px;
  background: #fff;
  flex: 0 1;
`;

export default function AccountTransactionsAll() {
  return (
    <AccountTransactionsAllProvider>
      <Box>
        <AccountTransactionsUncategorizeFilter />

        <CashflowTransactionsTableCard>
          <AccountTransactionsDataTable />
        </CashflowTransactionsTableCard>
      </Box>
    </AccountTransactionsAllProvider>
  );
}
