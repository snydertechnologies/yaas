import { Alignment, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useSetPrimaryBranchToForm, useSetPrimaryWarehouseToForm } from './utils';

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
import { useReceiptFormContext } from './ReceiptFormProvider';

/**
 * Receipt form topbar .
 * @returns {JSX.Element}
 */
export default function ReceiptFormTopBar() {
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
          <ReceiptFormSelectBranch />
        </FeatureCan>
        {featureCan(Features.Warehouses) && featureCan(Features.Branches) && <NavbarDivider />}
        <FeatureCan feature={Features.Warehouses}>
          <ReceiptFormSelectWarehouse />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

/**
 * Receipt select branch.
 * @returns
 */
function ReceiptFormSelectBranch() {
  // Receipt form context.
  const { branches, isBranchesLoading } = useReceiptFormContext();

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

/**
 * Receipt select warehouse.
 * @returns
 */
function ReceiptFormSelectWarehouse() {
  // Receipt form context.
  const { warehouses, isWarehouesLoading } = useReceiptFormContext();

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
