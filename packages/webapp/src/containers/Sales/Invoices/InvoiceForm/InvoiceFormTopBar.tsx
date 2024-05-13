import { Alignment, Classes, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useSetPrimaryBranchToForm, useSetPrimaryWarehouseToForm } from './utils';

import {
  BranchSelect,
  FeatureCan,
  FormBranchSelectButton,
  FormTopbar,
  FormWarehouseSelectButton,
  WarehouseSelect,
} from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { useInvoiceFormContext } from './InvoiceFormProvider';

/**
 * Invoice form topbar .
 * @returns {JSX.Element}
 */
export default function InvoiceFormTopBar() {
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
          <InvoiceFormSelectBranch />
        </FeatureCan>
        {featureCan(Features.Warehouses) && featureCan(Features.Branches) && <NavbarDivider />}
        <FeatureCan feature={Features.Warehouses}>
          <InvoiceFormSelectWarehouse />
        </FeatureCan>
      </NavbarGroup>
    </FormTopbar>
  );
}

function InvoiceFormSelectBranch() {
  // Invoice form context.
  const { branches, isBranchesLoading } = useInvoiceFormContext();

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

function InvoiceFormSelectWarehouse() {
  // Invoice form context.
  const { warehouses, isWarehouesLoading } = useInvoiceFormContext();

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

const DetailsBarSkeletonBase = styled.div`
  letter-spacing: 10px;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 8px;
  width: 140px;
  height: 10px;
`;
