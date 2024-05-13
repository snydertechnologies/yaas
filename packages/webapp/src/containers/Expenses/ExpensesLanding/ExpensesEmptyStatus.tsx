import { Can, EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, ExpenseAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function InvoicesEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'expenses.empty_status.title'} />}
      description={
        <p>
          <T id={'expenses.empty_status.description'} />
        </p>
      }
      action={
        <>
          <Can I={ExpenseAction.Create} a={AbilitySubject.Expense}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/expenses/new');
              }}
            >
              <T id={'new_expense'} />
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
