import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { useJournalSheetContext } from './JournalProvider';
import { JournalTable } from './JournalTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * Journal report body.
 * @returns {JSX.Element}
 */
function JournalBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useJournalSheetContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <JournalTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const JournalBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(JournalBodyJSX);
