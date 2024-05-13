import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { compose, saveInvoke, transformToForm } from '@bigcapital/webapp/utils';
import { getDefaultGeneralLedgerQuery, getGeneralLedgerQuerySchema } from './common';

import FinancialStatementHeader from '../FinancialStatementHeader';
import GeneralLedgerHeaderDimensionsPanel from './GeneralLedgerHeaderDimensionsPanel';
import GeneralLedgerHeaderGeneralPane from './GeneralLedgerHeaderGeneralPane';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import withGeneralLedger from './withGeneralLedger';
import withGeneralLedgerActions from './withGeneralLedgerActions';

/**
 * Geenral Ledger (GL) - Header.
 */
function GeneralLedgerHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withGeneralLedgerActions
  toggleGeneralLedgerFilterDrawer: toggleDisplayFilterDrawer,

  // #withGeneralLedger
  isFilterDrawerOpen,
}) {
  // Default values.
  const defaultValues = getDefaultGeneralLedgerQuery();

  // Initial values.
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
  const validationSchema = getGeneralLedgerQuerySchema();

  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    saveInvoke(onSubmitFilter, values);
    toggleDisplayFilterDrawer(false);
    setSubmitting(false);
  };
  // Handle cancel button click.
  const handleCancelClick = () => {
    toggleDisplayFilterDrawer(false);
  };
  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleDisplayFilterDrawer(false);
  };
  // Detarmines the feature whether is enabled.
  const { featureCan } = useFeatureCan();

  // Detarmine if the feature is enabled.
  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <GeneralLedgerDrawerHeader isOpen={isFilterDrawerOpen} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<GeneralLedgerHeaderGeneralPane />} />
            {isBranchesFeatureCan && (
              <Tab id="dimensions" title={<T id={'dimensions'} />} panel={<GeneralLedgerHeaderDimensionsPanel />} />
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
    </GeneralLedgerDrawerHeader>
  );
}

export default compose(
  withGeneralLedger(({ generalLedgerFilterDrawer }) => ({
    isFilterDrawerOpen: generalLedgerFilterDrawer,
  })),
  withGeneralLedgerActions,
)(GeneralLedgerHeader);

const GeneralLedgerDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 520px;
  }
`;
