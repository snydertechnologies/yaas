import { isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';

import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import {
  useCreditNotes,
  useRefreshCreditNotes,
  useResourceMeta,
  useResourceViews,
} from '@bigcapital/webapp/hooks/query';

import { getFieldsFromResourceMeta } from '@bigcapital/webapp/utils';

const CreditNoteListContext = React.createContext();

/**
 * Credit note data provider.
 */
function CreditNotesListProvider({ query, tableStateChanged, ...props }) {
  // Credit notes refresh action.
  const { refresh } = useRefreshCreditNotes();

  // Fetch create notes resource views and fields.
  const { data: CreditNotesView, isLoading: isViewsLoading } = useResourceViews('credit_notes');

  // Fetch the accounts resource fields.
  const {
    data: resourceMeta,
    isLoading: isResourceLoading,
    isFetching: isResourceFetching,
  } = useResourceMeta('credit_notes');

  // Fetch credit note list.
  const {
    data: { creditNotes, pagination, filterMeta },
    isFetching: isCreditNotesFetching,
    isLoading: isCreditNotesLoading,
  } = useCreditNotes(query, { keepPreviousData: true });

  // Detarmines the datatable empty status.S
  const isEmptyStatus = isEmpty(creditNotes) && !isCreditNotesLoading && !tableStateChanged;

  // Provider payload.
  const provider = {
    creditNotes,
    pagination,

    CreditNotesView,
    refresh,

    resourceMeta,
    fields: getFieldsFromResourceMeta(resourceMeta.fields),
    isResourceLoading,
    isResourceFetching,

    isCreditNotesFetching,
    isCreditNotesLoading,
    isViewsLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider loading={isViewsLoading || isResourceLoading} name={'credit-notes-list'}>
      <CreditNoteListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useCreditNoteListContext = () => React.useContext(CreditNoteListContext);

export { CreditNotesListProvider, useCreditNoteListContext };
