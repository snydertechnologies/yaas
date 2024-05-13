import { DrawerBody } from '@bigcapital/webapp/components';
// @ts-nocheck
import styled from 'styled-components';
import { CategorizeTransactionBoot } from './CategorizeTransactionBoot';
import { CategorizeTransactionForm } from './CategorizeTransactionForm';

export default function CategorizeTransactionContent({ uncategorizedTransactionId }) {
  return (
    <CategorizeTransactionBoot uncategorizedTransactionId={uncategorizedTransactionId}>
      <CategorizeTransactionDrawerBody>
        <CategorizeTransactionForm />
      </CategorizeTransactionDrawerBody>
    </CategorizeTransactionBoot>
  );
}

export const CategorizeTransactionDrawerBody = styled(DrawerBody)`
  padding: 20px;
  background-color: #fff;
`;
