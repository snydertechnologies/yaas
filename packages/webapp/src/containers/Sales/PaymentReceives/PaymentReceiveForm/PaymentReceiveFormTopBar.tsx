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
import { usePaymentReceiveFormContext } from './PaymentReceiveFormProvider';
import { useSetPrimaryBranchToForm } from './utils';

/**
 * Payment receive from top bar.
 * @returns {JSX.Element}
 */
export default function PaymentReceiveFormTopBar() {
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
          <PaymentReceiveFormSelectBranch />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

/**
 * Branch select of payment receive form.
 * @returns {JSX.Element}
 */
function PaymentReceiveFormSelectBranch() {
  // payment receive form context.
  const { branches, isBranchesLoading } = usePaymentReceiveFormContext();

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
