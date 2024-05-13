import {
  BranchSelect,
  DetailsBarSkeletonBase,
  FeatureCan,
  FormBranchSelectButton,
  FormTopbar,
} from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Alignment, Classes, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { usePaymentMadeFormContext } from './PaymentMadeFormProvider';
import { useSetPrimaryBranchToForm } from './utils';

/**
 * Payment made from top bar.
 * @returns
 */
export default function PaymentMadeFormTopBar() {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  // Can't display the navigation bar if  branches feature is not enabled.
  if (!featureCan(Features.Branches)) {
    return null;
  }
  return (
    <FormTopbar>
      <NavbarGroup align={Alignment.LEFT}>
        <FeatureCan feature={Features.Branches}>
          <PaymentMadeFormSelectBranch />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

function PaymentMadeFormSelectBranch() {
  // payment made form context.
  const { branches, isBranchesLoading } = usePaymentMadeFormContext();

  return isBranchesLoading ? (
    <DetailsBarSkeletonBase className={Classes.SKELETON} />
  ) : (
    <BranchSelect
      name={'branch_id'}
      branches={branches}
      input={FormBranchSelectButton}
      popoverProps={{ minimal: true }}
      fill={false}
    />
  );
}
