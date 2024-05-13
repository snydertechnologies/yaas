import { Tab } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { DrawerMainTabs } from '@bigcapital/webapp/components';
import { AbilitySubject, VendorCreditAction } from '@bigcapital/webapp/constants/abilityOption';
import { useAbilityContext } from '@bigcapital/webapp/hooks/utils';
import { VendorCreditGLEntriesTable } from './JournalEntriesTransactions/JournalEntriesTransactionsTable';
import ReconcileVendorCreditTransactionsTable from './ReconcileVendorCreditTransactions/ReconcileVendorCreditTransactionsTable';
import RefundVendorCreditTransactionsTable from './RefundVendorCreditTransactions/RefundVendorCreditTransactionsTable';
import VendorCreditDetailActionsBar from './VendorCreditDetailActionsBar';
import VendorCreditDetailPanel from './VendorCreditDetailPanel';

/**
 * Vendor credit view detail.
 *
 */
export default function VendorCreditDetail() {
  return (
    <VendorCreditRoot>
      <VendorCreditDetailActionsBar />
      <VendorCreditDetailsTabs />
    </VendorCreditRoot>
  );
}

/**
 * Vendor Credit details tabs.
 * @returns {React.JSX}
 */
function VendorCreditDetailsTabs() {
  const ability = useAbilityContext();

  return (
    <DrawerMainTabs renderActiveTabPanelOnly={true}>
      <Tab title={intl.get('details')} id={'details'} panel={<VendorCreditDetailPanel />} />
      <Tab title={intl.get('journal_entries')} id={'journal_entries'} panel={<VendorCreditGLEntriesTable />} />
      {ability.can(VendorCreditAction.View, AbilitySubject.VendorCredit) && (
        <Tab
          title={intl.get('vendor_credit.drawer.label_refund_transactions')}
          id={'refund_transactions'}
          panel={<RefundVendorCreditTransactionsTable />}
        />
      )}
      {ability.can(VendorCreditAction.View, AbilitySubject.VendorCredit) && (
        <Tab
          title={intl.get('vendor_credit.drawer.label_bills_reconciled')}
          id={'reconcile_transactions'}
          panel={<ReconcileVendorCreditTransactionsTable />}
        />
      )}
    </DrawerMainTabs>
  );
}

const VendorCreditRoot = styled.div``;
