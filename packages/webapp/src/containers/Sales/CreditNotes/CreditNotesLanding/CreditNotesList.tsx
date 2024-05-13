// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/CreditNote/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import CreditNotesActionsBar from './CreditNotesActionsBar';
import CreditNotesDataTable from './CreditNotesDataTable';
import CreditNotesViewTabs from './CreditNotesViewTabs';

import withCreditNotes from './withCreditNotes';
import withCreditNotesActions from './withCreditNotesActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { CreditNotesListProvider } from './CreditNotesListProvider';

function CreditNotesList({
  // #withCreditNotes
  creditNoteTableState,
  creditNoteTableStateChanged,

  // #withCreditNotesActions
  resetCreditNotesTableState,
}) {
  // Resets the credit note table state once the page unmount.
  React.useEffect(
    () => () => {
      resetCreditNotesTableState();
    },
    [resetCreditNotesTableState],
  );

  return (
    <CreditNotesListProvider
      query={transformTableStateToQuery(creditNoteTableState)}
      tableStateChanged={creditNoteTableStateChanged}
    >
      <CreditNotesActionsBar />
      <DashboardPageContent>
        <CreditNotesViewTabs />
        <CreditNotesDataTable />
      </DashboardPageContent>
    </CreditNotesListProvider>
  );
}

export default compose(
  withCreditNotesActions,
  withCreditNotes(({ creditNoteTableState, creditNoteTableStateChanged }) => ({
    creditNoteTableState,
    creditNoteTableStateChanged,
  })),
)(CreditNotesList);
