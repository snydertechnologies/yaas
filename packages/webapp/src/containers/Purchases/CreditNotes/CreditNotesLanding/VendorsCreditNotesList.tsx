// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/VendorsCreditNote/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import VendorsCreditNoteActionsBar from './VendorsCreditNoteActionsBar';
import VendorsCreditNoteDataTable from './VendorsCreditNoteDataTable';
import VendorsCreditNoteViewTabs from './VendorsCreditNoteViewTabs';

import withVendorsCreditNotes from './withVendorsCreditNotes';
import withVendorsCreditNotesActions from './withVendorsCreditNotesActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { VendorsCreditNoteListProvider } from './VendorsCreditNoteListProvider';

function VendorsCreditNotesList({
  // #withVendorsCreditNotes
  vendorsCreditNoteTableState,
  vendorsCreditNoteTableStateChanged,

  // #withVendorsCreditNotesActions
  resetVendorsCreditNoteTableState,
}) {
  // Resets the credit note table state once the page unmount.
  React.useEffect(
    () => () => {
      resetVendorsCreditNoteTableState();
    },
    [resetVendorsCreditNoteTableState],
  );

  return (
    <VendorsCreditNoteListProvider
      query={transformTableStateToQuery(vendorsCreditNoteTableState)}
      tableStateChanged={vendorsCreditNoteTableStateChanged}
    >
      <VendorsCreditNoteActionsBar />
      <DashboardPageContent>
        <VendorsCreditNoteViewTabs />
        <VendorsCreditNoteDataTable />
      </DashboardPageContent>
    </VendorsCreditNoteListProvider>
  );
}

export default compose(
  withVendorsCreditNotesActions,
  withVendorsCreditNotes(({ vendorsCreditNoteTableState, vendorsCreditNoteTableStateChanged }) => ({
    vendorsCreditNoteTableState,
    vendorsCreditNoteTableStateChanged,
  })),
)(VendorsCreditNotesList);
