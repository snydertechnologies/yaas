import { EmptyStatus } from '@bigcapital/webapp/components';
import { Can, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, PaymentReceiveAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PaymentReceivesEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'the_organization_doesn_t_receive_money_yet'} />}
      description={
        <p>
          <T id={'receiving_customer_payments_is_one_pleasant_accounting_tasks'} />
        </p>
      }
      action={
        <>
          <Can I={PaymentReceiveAction.Create} a={AbilitySubject.PaymentReceive}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/payment-receives/new');
              }}
            >
              <T id={'new_payment_receive'} />
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
