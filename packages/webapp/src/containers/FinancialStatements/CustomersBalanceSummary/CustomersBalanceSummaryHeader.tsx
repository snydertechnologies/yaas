// @ts-nocheck
import React from 'react';

import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import FinancialStatementHeader from '../FinancialStatementHeader';
import CustomersBalanceSummaryGeneralPanel from './CustomersBalanceSummaryGeneralPanel';
import withCustomersBalanceSummary from './withCustomersBalanceSummary';
import withCustomersBalanceSummaryActions from './withCustomersBalanceSummaryActions';

import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { getCustomersBalanceQuerySchema } from './utils';

/**
 * Customers balance summary.
 */
function CustomersBalanceSummaryHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  // #withCustomersBalanceSummary
  customersBalanceDrawerFilter,

  // #withCustomersBalanceSummaryActions
  toggleCustomerBalanceFilterDrawer,
}) {
  // validation schema.
  const validationSchema = getCustomersBalanceQuerySchema();

  // Default form values.
  const defaultValues = {
    ...pageFilter,
    asDate: moment().toDate(),
    customersIds: [],
  };

  // Filter form initial values.
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
    toggleCustomerBalanceFilterDrawer(false);
    setSubmitting(false);
  };
  // handle close drawer.
  const handleDrawerClose = () => {
    toggleCustomerBalanceFilterDrawer(false);
  };

  return (
    <CustomerBalanceDrawerHeader isOpen={customersBalanceDrawerFilter} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<CustomersBalanceSummaryGeneralPanel />} />
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
    </CustomerBalanceDrawerHeader>
  );
}

export default compose(
  withCustomersBalanceSummary(({ customersBalanceDrawerFilter }) => ({
    customersBalanceDrawerFilter,
  })),
  withCustomersBalanceSummaryActions,
)(CustomersBalanceSummaryHeader);

const CustomerBalanceDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 450px;
  }
`;
