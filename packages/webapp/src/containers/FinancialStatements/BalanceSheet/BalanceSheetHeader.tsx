import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';

import withBalanceSheet from './withBalanceSheet';
import withBalanceSheetActions from './withBalanceSheetActions';

import FinancialStatementHeader from '../../FinancialStatements/FinancialStatementHeader';
import BalanceSheetHeaderComparisonPanal from './BalanceSheetHeaderComparisonPanal';
import BalanceSheetHeaderDimensionsPanel from './BalanceSheetHeaderDimensionsPanel';
import BalanceSheetHeaderGeneralPanal from './BalanceSheetHeaderGeneralPanal';

import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getBalanceSheetHeaderValidationSchema, getDefaultBalanceSheetQuery } from './utils';

/**
 * Balance sheet header.
 */
function BalanceSheetHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withBalanceSheet
  balanceSheetDrawerFilter,

  // #withBalanceSheetActions
  toggleBalanceSheetFilterDrawer: toggleFilterDrawer,
}) {
  const defaultValues = getDefaultBalanceSheetQuery();

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
  // Validation schema.
  const validationSchema = getBalanceSheetHeaderValidationSchema();

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
  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <BalanceSheetFinancialHeader
      isOpen={balanceSheetDrawerFilter}
      drawerProps={{
        onClose: handleDrawerClose,
      }}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<BalanceSheetHeaderGeneralPanal />} />
            <Tab
              id="comparison"
              title={<T id={'balance_sheet.comparisons'} />}
              panel={<BalanceSheetHeaderComparisonPanal />}
            />
            {isBranchesFeatureCan && (
              <Tab
                id="dimensions"
                title={<T id={'balance_sheet.dimensions'} />}
                panel={<BalanceSheetHeaderDimensionsPanel />}
              />
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
    </BalanceSheetFinancialHeader>
  );
}

export default compose(
  withBalanceSheet(({ balanceSheetDrawerFilter }) => ({
    balanceSheetDrawerFilter,
  })),
  withBalanceSheetActions,
)(BalanceSheetHeader);

const BalanceSheetFinancialHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 520px;
  }
`;
