// @ts-nocheck
import React from 'react';

import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';

import FinancialStatementHeader from '../FinancialStatementHeader';
import InventoryItemDetailsHeaderDimensionsPanel from './InventoryItemDetailsHeaderDimensionsPanel';
import InventoryItemDetailsHeaderGeneralPanel from './InventoryItemDetailsHeaderGeneralPanel';

import withInventoryItemDetails from './withInventoryItemDetails';
import withInventoryItemDetailsActions from './withInventoryItemDetailsActions';

import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getInventoryItemDetailsDefaultQuery, getInventoryItemDetailsQuerySchema } from './utils2';

/**
 * Inventory item details header.
 */
function InventoryItemDetailsHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withInventoryItemDetails
  isFilterDrawerOpen,

  // #withInventoryItemDetailsActions
  toggleInventoryItemDetailsFilterDrawer: toggleFilterDrawer,
}) {
  // Default form values.
  const defaultValues = getInventoryItemDetailsDefaultQuery();

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
  const validationSchema = getInventoryItemDetailsQuerySchema();

  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleFilterDrawer(false);
    setSubmitting(false);
  };

  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleFilterDrawer(false);
  };

  // Detarmines the given feature whether is enabled.
  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);
  const isWarehousesFeatureCan = featureCan(Features.Warehouses);

  return (
    <InventoryItemDetailsDrawerHeader isOpen={isFilterDrawerOpen} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<InventoryItemDetailsHeaderGeneralPanel />} />
            {(isBranchesFeatureCan || isWarehousesFeatureCan) && (
              <Tab
                id="dimensions"
                title={<T id={'dimensions'} />}
                panel={<InventoryItemDetailsHeaderDimensionsPanel />}
              />
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
    </InventoryItemDetailsDrawerHeader>
  );
}

export default compose(
  withInventoryItemDetails(({ inventoryItemDetailDrawerFilter }) => ({
    isFilterDrawerOpen: inventoryItemDetailDrawerFilter,
  })),
  withInventoryItemDetailsActions,
)(InventoryItemDetailsHeader);

const InventoryItemDetailsDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 400px;
  }
`;
