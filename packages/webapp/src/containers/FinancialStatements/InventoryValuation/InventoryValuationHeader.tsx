import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';

import FinancialStatementHeader from '@bigcapital/webapp/containers/FinancialStatements/FinancialStatementHeader';
import InventoryValuationHeaderDimensionsPanel from './InventoryValuationHeaderDimensionsPanel';
import InventoryValuationHeaderGeneralPanel from './InventoryValuationHeaderGeneralPanel';
import withInventoryValuation from './withInventoryValuation';
import withInventoryValuationActions from './withInventoryValuationActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getInventoryValuationQuery, getInventoryValuationQuerySchema } from './utils';

/**
 * inventory valuation header.
 */
function InventoryValuationHeader({
  // #ownProps
  pageFilter,
  onSubmitFilter,

  // #withInventoryValuation
  isFilterDrawerOpen,

  // #withInventoryValuationActions
  toggleInventoryValuationFilterDrawer,
}) {
  // Form validation schema.
  const validationSchema = getInventoryValuationQuerySchema();
  const defaultQuery = getInventoryValuationQuery();

  // Initial values.
  const initialValues = transformToForm(
    {
      ...defaultQuery,
      ...pageFilter,
      asDate: moment(pageFilter.asDate).toDate(),
    },
    defaultQuery,
  );

  // Handle the form of header submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleInventoryValuationFilterDrawer(false);
    setSubmitting(false);
  };
  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleInventoryValuationFilterDrawer(false);
  };
  // Handle cancel button click.
  const handleCancelClick = () => {
    toggleInventoryValuationFilterDrawer(false);
  };
  // Detarmines the given feature whether is enabled.
  const { featureCan } = useFeatureCan();

  // Detarmine if these feature are enabled.
  const isBranchesFeatureCan = featureCan(Features.Branches);
  const isWarehousesFeatureCan = featureCan(Features.Warehouses);

  return (
    <InventoryValuationDrawerHeader isOpen={isFilterDrawerOpen} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<InventoryValuationHeaderGeneralPanel />} />
            {(isBranchesFeatureCan || isWarehousesFeatureCan) && (
              <Tab
                id="dimensions"
                title={<T id={'dimensions'} />}
                panel={<InventoryValuationHeaderDimensionsPanel />}
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
    </InventoryValuationDrawerHeader>
  );
}

export default compose(
  withInventoryValuation(({ inventoryValuationDrawerFilter }) => ({
    isFilterDrawerOpen: inventoryValuationDrawerFilter,
  })),
  withInventoryValuationActions,
)(InventoryValuationHeader);

const InventoryValuationDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 450px;
  }
`;
