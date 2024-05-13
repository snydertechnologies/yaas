import {
  BranchSelect,
  DetailsBarSkeletonBase,
  FeatureCan,
  FormBranchSelectButton,
  FormTopbar,
  FormWarehouseSelectButton,
  Icon,
  WarehouseSelect,
} from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Alignment, Button, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useVendorCreditNoteFormContext } from './VendorCreditNoteFormProvider';
import { useSetPrimaryBranchToForm, useSetPrimaryWarehouseToForm } from './utils';

/**
 * Vendor Credit note form topbar .
 * @returns {JSX.Element}
 */
export default function VendorCreditNoteFormTopBar() {
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
          <VendorCreditNoteFormSelectBranch />
        </FeatureCan>
        {featureCan(Features.Warehouses) && featureCan(Features.Branches) && <NavbarDivider />}
        <FeatureCan feature={Features.Warehouses}>
          <VendorCreditFormSelectWarehouse />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

function VendorCreditNoteFormSelectBranch() {
  //  Vendor credit note form context.
  const { branches, isBranchesLoading } = useVendorCreditNoteFormContext();

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

function VendorCreditFormSelectWarehouse() {
  // vendor credit note form context.
  const { warehouses, isWarehouesLoading } = useVendorCreditNoteFormContext();

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
