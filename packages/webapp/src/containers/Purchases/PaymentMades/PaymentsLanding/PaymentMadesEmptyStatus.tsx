import { Can, EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, PaymentMadeAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PaymentMadesEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'payment_made.empty_status.title'} />}
      description={
        <p>
          <T id="payment_made_empty_status_description" />
        </p>
      }
      action={
        <>
          <Can I={PaymentMadeAction.Create} a={AbilitySubject.PaymentMade}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/payment-mades/new');
              }}
            >
              <T id={'new_bill_payment'} />
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
