import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import * as Yup from 'yup';

import FinancialStatementHeader from '../FinancialStatementHeader';
import CashFlowStatementDimensionsPanel from './CashFlowStatementDimensionsPanel';
import CashFlowStatementGeneralPanel from './CashFlowStatementGeneralPanel';

import withCashFlowStatement from './withCashFlowStatement';
import withCashFlowStatementActions from './withCashFlowStatementActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getDefaultCashFlowSheetQuery } from './utils';

/**
 * Cash flow statement header.
 */
function CashFlowStatementHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withCashFlowStatement
  isFilterDrawerOpen,

  // #withCashStatementActions
  toggleCashFlowStatementFilterDrawer,
}) {
  // Filter form default values.
  const defaultValues = getDefaultCashFlowSheetQuery();

  // Initial form values.
  const initialValues = transformToForm(
    {
      ...pageFilter,
      fromDate: moment(pageFilter.fromDate).toDate(),
      toDate: moment(pageFilter.toDate).toDate(),
    },
    defaultValues,
  );
  // Validation schema.
  const validationSchema = Yup.object().shape({
    dateRange: Yup.string().optional(),
    fromDate: Yup.date().required().label(intl.get('fromDate')),
    toDate: Yup.date().min(Yup.ref('fromDate')).required().label(intl.get('toDate')),
    displayColumnsType: Yup.string(),
  });

  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleCashFlowStatementFilterDrawer(false);
    setSubmitting(false);
  };

  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleCashFlowStatementFilterDrawer(false);
  };

  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <FinancialStatementHeader isOpen={isFilterDrawerOpen} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<CashFlowStatementGeneralPanel />} />
            {isBranchesFeatureCan && (
              <Tab id="dimensions" title={<T id={'dimensions'} />} panel={<CashFlowStatementDimensionsPanel />} />
            )}
          </Tabs>

          <div className="financial-header-drawer__footer">
            <Button className={'mr1'} intent={Intent.PRIMARY} type={'submit'}>
              <T id={'calculate_report'} />
            </Button>
            <Button onClick={handleDrawerClose} minimal={true}>
              <T id={'cancel'} />
            </Button>
          </div>
        </Form>
      </Formik>
    </FinancialStatementHeader>
  );
}

export default compose(
  withCashFlowStatement(({ cashFlowStatementDrawerFilter }) => ({
    isFilterDrawerOpen: cashFlowStatementDrawerFilter,
  })),
  withCashFlowStatementActions,
)(CashFlowStatementHeader);
