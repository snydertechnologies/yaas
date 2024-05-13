import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormattedMessage as T } from '@bigcapital/webapp/components';

import FinancialStatementHeader from '../FinancialStatementHeader';
import TrialBalanceSheetHeaderDimensionsPanel from './TrialBalanceSheetHeaderDimensionsPanel';
import TrialBalanceSheetHeaderGeneralPanel from './TrialBalanceSheetHeaderGeneralPanel';

import withTrialBalance from './withTrialBalance';
import withTrialBalanceActions from './withTrialBalanceActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { compose, transformToForm } from '@bigcapital/webapp/utils';

/**
 * Trial balance sheet header.
 */
function TrialBalanceSheetHeader({
  // #ownProps
  pageFilter,
  onSubmitFilter,

  // #withTrialBalance
  trialBalanceDrawerFilter,

  // #withTrialBalanceActions
  toggleTrialBalanceFilterDrawer: toggleFilterDrawer,
}) {
  // Form validation schema.
  const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required().label(intl.get('from_date')),
    toDate: Yup.date().min(Yup.ref('fromDate')).required().label(intl.get('to_date')),
  });
  // Detarmines whether the feature is enabled.
  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);

  // Default values.
  const defaultValues = {
    fromDate: moment().toDate(),
    toDate: moment().toDate(),
    branchesIds: [],
  };

  // Initial values.
  const initialValues = transformToForm(
    {
      ...pageFilter,
      fromDate: moment(pageFilter.fromDate).toDate(),
      toDate: moment(pageFilter.toDate).toDate(),
    },
    defaultValues,
  );
  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    setSubmitting(false);
    toggleFilterDrawer(false);
  };
  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleFilterDrawer(false);
  };

  // Handle cancel button click.
  const handleCancelClick = () => {
    toggleFilterDrawer(false);
  };

  return (
    <TrialBalanceSheetDrawerHeader isOpen={trialBalanceDrawerFilter} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<TrialBalanceSheetHeaderGeneralPanel />} />
            {isBranchesFeatureCan && (
              <Tab id="dimensions" title={<T id={'dimensions'} />} panel={<TrialBalanceSheetHeaderDimensionsPanel />} />
            )}
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
    </TrialBalanceSheetDrawerHeader>
  );
}

export default compose(
  withTrialBalance(({ trialBalanceDrawerFilter }) => ({
    trialBalanceDrawerFilter,
  })),
  withTrialBalanceActions,
)(TrialBalanceSheetHeader);

const TrialBalanceSheetDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 450px;
  }
`;
