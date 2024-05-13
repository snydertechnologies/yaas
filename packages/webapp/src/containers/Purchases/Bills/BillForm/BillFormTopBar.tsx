import {
  BranchSelect,
  DetailsBarSkeletonBase,
  FeatureCan,
  FormBranchSelectButton,
  FormTopbar,
  FormWarehouseSelectButton,
  WarehouseSelect,
} from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Alignment, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useBillFormContext } from './BillFormProvider';
import { useSetPrimaryBranchToForm, useSetPrimaryWarehouseToForm } from './utils';

/**
 * Bill form topbar .
 * @returns {JSX.Element}
 */
export default function BillFormTopBar() {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Sets the primary warehouse to form.
  useSetPrimaryWarehouseToForm();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  // Can't display the navigation bar if warehouses or branches feature is not enabled.
  if (!featureCan(Features.Warehouses) && !featureCan(Features.Branches)) {
    return null;
  }

  return (
    <FormTopbar>
      <NavbarGroup align={Alignment.LEFT}>
        <FeatureCan feature={Features.Branches}>
          <BillFormSelectBranch />
        </FeatureCan>
        {featureCan(Features.Warehouses) && featureCan(Features.Branches) && <NavbarDivider />}
        <FeatureCan feature={Features.Warehouses}>
          <BillFormSelectWarehouse />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

function BillFormSelectBranch() {
  // Bill form context.
  const { branches, isBranchesLoading } = useBillFormContext();

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

function BillFormSelectWarehouse() {
  // Bill form context.
  const { warehouses, isWarehouesLoading } = useBillFormContext();

  return isWarehouesLoading ? (
    <DetailsBarSkeletonBase className={Classes.SKELETON} />
  ) : (
    <WarehouseSelect
      name={'warehouse_id'}
      warehouses={warehouses}
      input={FormWarehouseSelectButton}
      popoverProps={{ minimal: true }}
      fill={false}
    />
  );
}
