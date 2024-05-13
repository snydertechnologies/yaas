import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import MakeJournalEntriesTable from './MakeJournalEntriesTable';
import { useMakeJournalFormContext } from './MakeJournalProvider';
import { MIN_LINES_NUMBER, defaultEntry, entriesFieldShouldUpdate } from './utils';

/**
 * Make journal entries field.
 */
export default function MakeJournalEntriesField() {
  const { accounts, contacts, branches, projects } = useMakeJournalFormContext();

  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField
        name={'entries'}
        contacts={contacts}
        accounts={accounts}
        branches={branches}
        projects={projects}
        shouldUpdate={entriesFieldShouldUpdate}
      >
        {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
          <MakeJournalEntriesTable
            onChange={(entries) => {
              setFieldValue('entries', entries);
            }}
            entries={value}
            defaultEntry={defaultEntry}
            initialLinesNumber={MIN_LINES_NUMBER}
            error={error}
            currencyCode={values.currency_code}
          />
        )}
      </FastField>
    </div>
  );
}
