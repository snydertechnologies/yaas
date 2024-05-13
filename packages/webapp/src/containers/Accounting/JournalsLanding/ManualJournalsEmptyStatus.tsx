import { Can, EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, ManualJournalAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ManualJournalsEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'manual_journals.empty_status.title'} />}
      description={
        <p>
          <T id={'manual_journals.empty_status.description'} />
        </p>
      }
      action={
        <>
          <Can I={ManualJournalAction.Create} a={AbilitySubject.ManualJournal}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/make-journal-entry');
              }}
            >
              <T id={'make_journal'} />
            </Button>

            <Button intent={Intent.NONE} large={true}>
              <T id={'learn_more'} />
            </Button>
          </Can>
        </>
      }
    />
  );
}
