import { Can, EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, VendorCreditAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function VendorsCreditNoteEmptyStatus() {
  const history = useHistory();
  return (
    <EmptyStatus
      title={<T id={'vendor_credits.empty_status.title'} />}
      description={
        <p>
          <T id={'vendor_credits.empty_status.description'} />
        </p>
      }
      action={
        <>
          <Can I={VendorCreditAction.Create} a={AbilitySubject.VendorCredit}>
            <Button intent={Intent.PRIMARY} large={true} onClick={() => history.push('/vendor-credits/new')}>
              <T id={'vendor_credits.label.new_vendor_credit'} />
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
