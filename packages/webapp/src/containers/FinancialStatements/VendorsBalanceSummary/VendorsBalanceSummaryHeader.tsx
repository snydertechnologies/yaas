// @ts-nocheck
import React from 'react';

import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { compose, transformToForm } from '@bigcapital/webapp/utils';

import FinancialStatementHeader from '../FinancialStatementHeader';
import VendorsBalanceSummaryHeaderGeneral from './VendorsBalanceSummaryHeaderGeneral';
import { getVendorsBalanceQuerySchema } from './utils';
import withVendorsBalanceSummary from './withVendorsBalanceSummary';
import withVendorsBalanceSummaryActions from './withVendorsBalanceSummaryActions';

/**
 * Vendors balance summary drawer header.
 */
function VendorsBalanceSummaryHeader({
  // #ownProps
  pageFilter,
  onSubmitFilter,

  //#withVendorsBalanceSummary
  VendorsSummaryFilterDrawer,

  //#withVendorsBalanceSummaryActions
  toggleVendorSummaryFilterDrawer,
}) {
  // Validation schema.
  const validationSchema = getVendorsBalanceQuerySchema();

  // filter form initial values.
  const defaultValues = {
    ...pageFilter,
    asDate: moment().toDate(),
    vendorsIds: [],
  };
  // Initial form values.
  const initialValues = transformToForm(
    {
      ...defaultValues,

      ...pageFilter,
      asDate: moment(pageFilter.asDate).toDate(),
    },
    defaultValues,
  );

  // handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleVendorSummaryFilterDrawer(false);
    setSubmitting(false);
  };

  // handle cancel button click.
  const handleCancelClick = () => {
    toggleVendorSummaryFilterDrawer(false);
  };

  return (
    <VendorBalanceDrawerHeader isOpen={VendorsSummaryFilterDrawer} drawerProps={{ onClose: handleCancelClick }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id={'general'} title={<T id={'general'} />} panel={<VendorsBalanceSummaryHeaderGeneral />} />
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
    </VendorBalanceDrawerHeader>
  );
}

export default compose(
  withVendorsBalanceSummary(({ VendorsSummaryFilterDrawer }) => ({
    VendorsSummaryFilterDrawer,
  })),
  withVendorsBalanceSummaryActions,
)(VendorsBalanceSummaryHeader);

const VendorBalanceDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 450px;
  }
`;
