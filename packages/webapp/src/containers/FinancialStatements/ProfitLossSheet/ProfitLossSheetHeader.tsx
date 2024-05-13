import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import FinancialStatementHeader from '../FinancialStatementHeader';
import ProfitLossSheetHeaderComparisonPanel from './ProfitLossSheetHeaderComparisonPanel';
import ProfitLossSheetHeaderDimensionsPanel from './ProfitLossSheetHeaderDimensionsPanel';
import ProfitLossSheetHeaderGeneralPane from './ProfitLossSheetHeaderGeneralPane';

import withProfitLoss from './withProfitLoss';
import withProfitLossActions from './withProfitLossActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { useProfitLossHeaderValidationSchema } from './utils';

/**
 * Profit/loss header.
 * @returns {React.JSX}
 */
function ProfitLossHeader({
  // #ownProps
  pageFilter,
  onSubmitFilter,

  // #withProfitLoss
  profitLossDrawerFilter,

  // #withProfitLossActions
  toggleProfitLossFilterDrawer: toggleFilterDrawer,
}) {
  // Validation schema.
  const validationSchema = useProfitLossHeaderValidationSchema();

  // Initial values.
  const initialValues = {
    ...pageFilter,
    fromDate: moment(pageFilter.fromDate).toDate(),
    toDate: moment(pageFilter.toDate).toDate(),
  };
  // Handle form submit.
  const handleSubmit = (values, actions) => {
    onSubmitFilter(values);
    toggleFilterDrawer(false);
  };
  // Handles the cancel button click.
  const handleCancelClick = () => {
    toggleFilterDrawer(false);
  };
  // Handles the drawer close action.
  const handleDrawerClose = () => {
    toggleFilterDrawer(false);
  };

  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <ProfitLossSheetHeader isOpen={profitLossDrawerFilter} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<ProfitLossSheetHeaderGeneralPane />} />
            <Tab
              id="comparison"
              title={<T id={'profit_loss_sheet.comparisons'} />}
              panel={<ProfitLossSheetHeaderComparisonPanel />}
            />
            {isBranchesFeatureCan && (
              <Tab
                id="dimensions"
                title={<T id={'profit_loss_sheet.dimensions'} />}
                panel={<ProfitLossSheetHeaderDimensionsPanel />}
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
    </ProfitLossSheetHeader>
  );
}

export default R.compose(
  withProfitLoss(({ profitLossDrawerFilter }) => ({
    profitLossDrawerFilter,
  })),
  withProfitLossActions,
)(ProfitLossHeader);

const ProfitLossSheetHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 520px;
  }
`;
