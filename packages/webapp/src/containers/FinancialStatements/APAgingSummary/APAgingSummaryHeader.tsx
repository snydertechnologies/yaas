import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import FinancialStatementHeader from '@bigcapital/webapp/containers/FinancialStatements/FinancialStatementHeader';
import APAgingSummaryHeaderDimensions from './APAgingSummaryHeaderDimensions';
import APAgingSummaryHeaderGeneral from './APAgingSummaryHeaderGeneral';

import withAPAgingSummary from './withAPAgingSummary';
import withAPAgingSummaryActions from './withAPAgingSummaryActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getAPAgingSummaryQuerySchema, getDefaultAPAgingSummaryQuery } from './common';

/**
 * AP Aging Summary Report - Drawer Header.
 */
function APAgingSummaryHeader({
  // #ownProps
  pageFilter,
  onSubmitFilter,

  // #withAPAgingSummaryActions
  toggleAPAgingSummaryFilterDrawer: toggleFilterDrawerDisplay,

  // #withAPAgingSummary
  isFilterDrawerOpen,
}) {
  // Validation schema.
  const validationSchema = getAPAgingSummaryQuerySchema();

  // Initial values.
  const defaultValues = getDefaultAPAgingSummaryQuery();

  // Formik initial values.
  const initialValues = transformToForm({ ...defaultValues, ...pageFilter }, defaultValues);
  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleFilterDrawerDisplay(false);
    setSubmitting(false);
  };
  // Handle cancel button click.
  const handleCancelClick = () => {
    toggleFilterDrawerDisplay(false);
  };
  // Handle the drawer closing.
  const handleDrawerClose = () => {
    toggleFilterDrawerDisplay(false);
  };
  // Detarmines whether the feature is enabled.
  const { featureCan } = useFeatureCan();
  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <APAgingDrawerHeader isOpen={isFilterDrawerOpen} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id={'general'} title={<T id={'general'} />} panel={<APAgingSummaryHeaderGeneral />} />
            {isBranchesFeatureCan && (
              <Tab id="dimensions" title={<T id={'dimensions'} />} panel={<APAgingSummaryHeaderDimensions />} />
            )}
          </Tabs>
          <div className={'financial-header-drawer__footer'}>
            <Button className={'mr1'} intent={Intent.PRIMARY} type={'submit'}>
              <T id={'calculate_report'} />
            </Button>
            <Button onClick={handleCancelClick} minimal={true}>
              <T id={'cancel'} />
            </Button>
          </div>
        </Form>
      </Formik>
    </APAgingDrawerHeader>
  );
}

export default compose(
  withAPAgingSummaryActions,
  withAPAgingSummary(({ APAgingSummaryFilterDrawer }) => ({
    isFilterDrawerOpen: APAgingSummaryFilterDrawer,
  })),
)(APAgingSummaryHeader);

const APAgingDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 520px;
  }
`;
