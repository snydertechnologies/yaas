import { Col, FFormGroup, ItemsMultiSelect, Row, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import FinancialStatementDateRange from '../FinancialStatementDateRange';

import {
  InventoryItemDetailsHeaderGeneralProvider,
  useInventoryItemDetailsHeaderGeneralContext,
} from './InventoryItemDetailsHeaderGeneralProvider';

/**
 * Inventory item details header - General panel.
 */
export default function InventoryItemDetailsHeaderGeneralPanel() {
  return (
    <InventoryItemDetailsHeaderGeneralProvider>
      <InventoryItemDetailsHeaderGeneralPanelContent />
    </InventoryItemDetailsHeaderGeneralProvider>
  );
}

/**
 * Inventory item details header - General panel - Content.
 */
function InventoryItemDetailsHeaderGeneralPanelContent() {
  const { items } = useInventoryItemDetailsHeaderGeneralContext();

  return (
    <div>
      <FinancialStatementDateRange />

      <Row>
        <Col xs={4}>
          <FFormGroup label={<T id={'Specific items'} />} name={'itemsIds'}>
            <ItemsMultiSelect name={'itemsIds'} items={items} />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}
