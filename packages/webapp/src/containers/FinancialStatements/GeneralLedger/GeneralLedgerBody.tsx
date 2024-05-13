import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import GeneralLedgerTable from './GeneralLedgerTable';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import { useGeneralLedgerContext } from './GeneralLedgerProvider';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * General ledger body JSX.
 */
function GeneralLedgerBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useGeneralLedgerContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <GeneralLedgerTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const GeneralLedgerBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(GeneralLedgerBodyJSX);
