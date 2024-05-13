import { EmptyStatus } from '@bigcapital/webapp/components';
import { Can, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, SaleReceiptAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ReceiptsEmptyStatus() {
  const history = useHistory();

  return (
    <EmptyStatus
      title={<T id={'manage_the_organization_s_services_and_products'} />}
      description={
        <p>
          <T id={'receipt_empty_status_description'} />
        </p>
      }
      action={
        <>
          <Can I={SaleReceiptAction.Create} a={AbilitySubject.Receipt}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/receipts/new');
              }}
            >
              <T id={'new_receipt'} />
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
