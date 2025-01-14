import { EmptyStatus } from '@bigcapital/webapp/components';
import { Can, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, SaleEstimateAction } from '@bigcapital/webapp/constants/abilityOption';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function EstimatesEmptyStatus() {
  const history = useHistory();
  return (
    <EmptyStatus
      title={<T id={'it_s_time_to_send_estimates_to_your_customers'} />}
      description={
        <p>
          <T id={'estimate_is_used_to_create_bid_proposal_or_quote'} />
        </p>
      }
      action={
        <>
          <Can I={SaleEstimateAction.Create} a={AbilitySubject.Estimate}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={() => {
                history.push('/estimates/new');
              }}
            >
              <T id={'new_sale_estimate'} />
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
