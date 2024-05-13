import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useJournal } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const ManualJournalDrawerContext = React.createContext();

/**
 * Manual journal drawer provider.
 */
function ManualJournalDrawerProvider({ manualJournalId, ...props }) {
  // Fetch the specific manual journal details.
  const {
    data: manualJournal,
    isLoading: isJournalLoading,
    isFetching: isJournalFetching,
  } = useJournal(manualJournalId, {
    enabled: !!manualJournalId,
  });

  // Provider.
  const provider = {
    manualJournalId,
    manualJournal,

    isJournalFetching,
    isJournalLoading,
  };

  return (
    <DrawerLoading loading={isJournalLoading}>
      <DrawerHeaderContent
        name={DRAWERS.JOURNAL_DETAILS}
        title={intl.get('manual_journal.drawer.title', {
          number: manualJournal?.journal_number,
        })}
      />
      <ManualJournalDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useManualJournalDrawerContext = () => React.useContext(ManualJournalDrawerContext);

export { ManualJournalDrawerProvider, useManualJournalDrawerContext };
