import { BranchMultiSelect, Col, Row } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Classes, FormGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import {
  ProfitLossSheetHeaderDimensionsProvider,
  useProfitLossSheetPanelContext,
} from './ProfitLossSheetHeaderDimensionsProvider';

/**
 * profit loss Sheet Header dimensions panel.
 * @returns {JSX.Element}
 */
export default function ProfitLossSheetHeaderDimensionsPanel() {
  return (
    <ProfitLossSheetHeaderDimensionsProvider>
      <ProfitLossSheetHeaderDimensionsPanelContent />
    </ProfitLossSheetHeaderDimensionsProvider>
  );
}

/**
 * Profit/Loss Sheet Header dimensions panel content.
 * @returns {JSX.Element}
 */
function ProfitLossSheetHeaderDimensionsPanelContent() {
  const { branches } = useProfitLossSheetPanelContext();
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
