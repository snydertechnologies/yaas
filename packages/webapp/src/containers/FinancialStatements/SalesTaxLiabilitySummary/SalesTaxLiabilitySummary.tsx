import moment from 'moment';
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import { SalesTaxLiabilitySummaryLoadingBar } from './components';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { compose } from '@bigcapital/webapp/utils';
import { SalesTaxLiabiltiyPdfDialog } from './SalesTaxLiabilityPdfDialog';
import SalesTaxLiabilitySummaryActionsBar from './SalesTaxLiabilitySummaryActionsBar';
import { SalesTaxLiabilitySummaryBody } from './SalesTaxLiabilitySummaryBody';
import { SalesTaxLiabilitySummaryBoot } from './SalesTaxLiabilitySummaryBoot';
import SalesTaxLiabilitySummaryHeader from './SalesTaxLiabilitySummaryHeader';
import { useSalesTaxLiabilitySummaryQuery } from './utils';
import withSalesTaxLiabilitySummaryActions from './withSalesTaxLiabilitySummaryActions';

/**
 * Sales tax liability summary.
 * @returns {React.JSX}
 */
function SalesTaxLiabilitySummary({
  // #withSalesTaxLiabilitySummaryActions
  toggleSalesTaxLiabilitySummaryFilterDrawer,
}) {
  const [query, setQuery] = useSalesTaxLiabilitySummaryQuery();

  const handleFilterSubmit = (filter) => {
    const newFilter = {
      ...filter,
      fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
      toDate: moment(filter.toDate).format('YYYY-MM-DD'),
    };
    setQuery({ ...newFilter });
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (values) => {
    setQuery({
      ...query,
      numberFormat: values,
    });
  };
  // Hides the filter drawer once the page unmount.
  useEffect(
    () => () => {
      toggleSalesTaxLiabilitySummaryFilterDrawer(false);
    },
    [toggleSalesTaxLiabilitySummaryFilterDrawer],
  );

  return (
    <SalesTaxLiabilitySummaryBoot filter={query}>
      <SalesTaxLiabilitySummaryActionsBar
        numberFormat={query.numberFormat}
        onNumberFormatSubmit={handleNumberFormatSubmit}
      />
      <SalesTaxLiabilitySummaryLoadingBar />

      <DashboardPageContent>
        <FinancialStatement>
          <SalesTaxLiabilitySummaryHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <SalesTaxLiabilitySummaryBody />
        </FinancialStatement>
      </DashboardPageContent>

      <SalesTaxLiabiltiyPdfDialog dialogName={DialogsName.SalesTaxLiabilitySummaryPdfPreview} />
    </SalesTaxLiabilitySummaryBoot>
  );
}

export default compose(withSalesTaxLiabilitySummaryActions)(SalesTaxLiabilitySummary);
