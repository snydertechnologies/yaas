import { BranchMultiSelect, Col, Row } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Classes, FormGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import {
  BalanceSheetHeaderDimensionsProvider,
  useBalanceSheetHeaderDimensionsPanelContext,
} from './BalanceSheetHeaderDimensionsProvider';

/**
 * Balance sheet header dismension panel.
 * @returns
 */
export default function BalanceSheetHeaderDimensionsPanel() {
  return (
    <BalanceSheetHeaderDimensionsProvider>
      <BalanceSheetHeaderDimensionsPanelContent />
    </BalanceSheetHeaderDimensionsProvider>
  );
}

/**
 * Balance sheet header dismension panel content.
 * @returns
 */
function BalanceSheetHeaderDimensionsPanelContent() {
  const { branches } = useBalanceSheetHeaderDimensionsPanelContext();
  const { featureCan } = useFeatureCan();

  const isBranchesFeatureCan = featureCan(Features.Branches);

  return (
    <Row>
      <Col xs={4}>
        {isBranchesFeatureCan && (
          <FormGroup label={intl.get('branches_multi_select.label')} className={Classes.FILL}>
            <BranchMultiSelect name={'branchesIds'} branches={branches} />
          </FormGroup>
        )}
      </Col>
    </Row>
  );
}
