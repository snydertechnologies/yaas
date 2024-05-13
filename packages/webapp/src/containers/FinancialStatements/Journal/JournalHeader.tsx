import { Button, Intent, Tab, Tabs } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormattedMessage as T } from '@bigcapital/webapp/components';

import FinancialStatementHeader from '@bigcapital/webapp/containers/FinancialStatements/FinancialStatementHeader';
import JournalSheetHeaderGeneral from './JournalSheetHeaderGeneral';

import withJournal from './withJournal';
import withJournalActions from './withJournalActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Journal sheet header.
 */
function JournalHeader({
  pageFilter,
  onSubmitFilter,

  // #withJournalActions
  toggleJournalSheetFilter,

  // #withJournal
  journalSheetDrawerFilter,
}) {
  const initialValues = {
    ...pageFilter,
    fromDate: moment(pageFilter.fromDate).toDate(),
    toDate: moment(pageFilter.toDate).toDate(),
  };

  // Validation schema.
  const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required(),
    toDate: Yup.date().min(Yup.ref('fromDate')).required(),
  });

  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    setSubmitting(false);
    toggleJournalSheetFilter(false);
  };

  // Handle cancel journal drawer header.
  const handleCancelClick = () => {
    toggleJournalSheetFilter(false);
  };

  const handleDrawerClose = () => {
    toggleJournalSheetFilter(false);
  };

  return (
    <JournalDrawerHeader isOpen={journalSheetDrawerFilter} drawerProps={{ onClose: handleDrawerClose }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab id="general" title={<T id={'general'} />} panel={<JournalSheetHeaderGeneral />} />
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
    </JournalDrawerHeader>
  );
}

export default compose(
  withJournal(({ journalSheetDrawerFilter }) => ({
    journalSheetDrawerFilter,
  })),
  withJournalActions,
)(JournalHeader);

const JournalDrawerHeader = styled(FinancialStatementHeader)`
  .bp4-drawer {
    max-height: 350px;
  }
`;
