import { EmptyStatus } from '@bigcapital/webapp/components';
import { Can, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, BillAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BillsEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'manage_the_organization_s_services_and_products'} />}
      description={
        <p>
          <T id="bill_empty_status_description" />
        </p>
      }
      action={
        <>
          <Can I={BillAction.Create} a={AbilitySubject.Bill}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/bills/new');
              }}
            >
              <T id={'new_bill'} />
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
