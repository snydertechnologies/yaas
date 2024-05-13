import { BranchMultiSelect, Col, Row, WarehouseMultiSelect } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Classes, FormGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import {
  InventoryValuationHeaderDimensionsProvider,
  useInventoryValuationHeaderDimensionsPanelContext,
} from './InventoryValuationHeaderDimensionsPanelProvider';

/**
 * Inventory Valuation header dismension panel.
 * @returns {JSX.Element}
 */
export default function InventoryValuationHeaderDimensionsPanel() {
  return (
    <InventoryValuationHeaderDimensionsProvider>
      <InventoryValuationHeaderDimensionsPanelContent />
    </InventoryValuationHeaderDimensionsProvider>
  );
}

/**
 * Inventory Valuation header dismension panel content.
 * @returns {JSX.Element}
 */
function InventoryValuationHeaderDimensionsPanelContent() {
  const { warehouses, branches } = useInventoryValuationHeaderDimensionsPanelContext();

  // Detarmines the given feature whether is enabled.
  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);
  const isWarehousesFeatureCan = featureCan(Features.Warehouses);

  return (
    <Row>
      <Col xs={4}>
        {isBranchesFeatureCan && (
          <FormGroup label={intl.get('branches_multi_select.label')} className={Classes.FILL}>
            <BranchMultiSelect name={'branchesIds'} branches={branches} />
          </FormGroup>
        )}
        {isWarehousesFeatureCan && (
          <FormGroup label={intl.get('warehouses_multi_select.label')} className={Classes.FILL}>
            <WarehouseMultiSelect name={'warehousesIds'} warehouses={warehouses} />
          </FormGroup>
        )}
      </Col>
    </Row>
  );
}
