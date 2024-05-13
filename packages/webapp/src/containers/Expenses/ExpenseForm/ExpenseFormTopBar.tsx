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
import { useExpenseFormContext } from './ExpenseFormPageProvider';
import { useSetPrimaryBranchToForm } from './utils';

/**
 * Expenses form topbar.
 * @returns
 */
export default function ExpenseFormTopBar() {
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
          <ExpenseFormSelectBranch />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

function ExpenseFormSelectBranch() {
  // Invoice form context.
  const { branches, isBranchesLoading } = useExpenseFormContext();

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
