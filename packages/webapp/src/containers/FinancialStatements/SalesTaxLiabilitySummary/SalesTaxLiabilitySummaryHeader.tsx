import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import FinancialStatementHeader from '../../FinancialStatements/FinancialStatementHeader';

import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { SalesTaxLiabilitySummaryHeaderGeneral } from './SalesTaxLiabilitySummaryHeaderGeneralPanel';
import { getDefaultSalesTaxLiablitySummaryQuery, getSalesTaxLiabilitySummaryQueryValidation } from './utils';
import withSalesTaxLiabilitySummary from './withSalesTaxLiabilitySummary';
import withSalesTaxLiabilitySummaryActions from './withSalesTaxLiabilitySummaryActions';

/**
 * Sales tax liability summary header.
 */
function SalesTaxLiabilitySummaryHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withSalesTaxLiabilitySummary
  salesTaxLiabilitySummaryFilter,

  // #withSalesTaxLiabilitySummaryActions
  toggleSalesTaxLiabilitySummaryFilterDrawer: toggleFilterDrawer,
}) {
  const defaultValues = getDefaultSalesTaxLiablitySummaryQuery();

  // Validation schema.
  const validationSchema = getSalesTaxLiabilitySummaryQueryValidation();

  // Filter form initial values.
  const initialValues = transformToForm(
    {
      ...defaultValues,
      ...pageFilter,
      fromDate: moment(pageFilter.fromDate).toDate(),
      toDate: moment(pageFilter.toDate).toDate(),
    },
    defaultValues,
  );

  // Handle form submit.
  const handleSubmit = (values, actions) => {
    onSubmitFilter(values);
    toggleFilterDrawer(false);
    actions.setSubmitting(false);
  };
  // Handle cancel button click.
  const handleCancelClick = () => {
    toggleFilterDrawer(false);
  };
  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleFilterDrawer(false);
  };
  // Detarmines the given feature whether is enabled.
  const { featureCan } = useFeatureCan();

  return (
    <SalesTaxSummaryFinancialHeader
      isOpen={salesTaxLiabilitySummaryFilter}
      drawerProps={{
        onClose: handleDrawerClose,
      }}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<SalesTaxLiabilitySummaryHeaderGeneral />} />
          </Tabs>

          <div className="financial-header-drawer__footer">
            <Button className={'mr1'} intent={Intent.PRIMARY} type={'submit'}>
              <T id={'calculate_report'} />
            </Button>
            <Button onClick={handleCancelClick} minimal={true}>
              <T id={'cancel'} />
            </Button>
          </div>
        </Form>
      </Formik>
    </SalesTaxSummaryFinancialHeader>
  );
}

export default compose(
  withSalesTaxLiabilitySummary(({ salesTaxLiabilitySummaryFilter }) => ({
    salesTaxLiabilitySummaryFilter,
  })),
  withSalesTaxLiabilitySummaryActions,
)(SalesTaxLiabilitySummaryHeader);

const SalesTaxSummaryFinancialHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 320px;
  }
`;
