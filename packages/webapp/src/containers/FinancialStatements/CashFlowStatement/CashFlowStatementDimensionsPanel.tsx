import { BranchMultiSelect, Col, Row } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { Classes, FormGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import {
  CashFlowStatementDimensionsPanelProvider,
  useCashFlowStatementDimensionsPanelContext,
} from './CashFlowStatementDimensionsPanelProvider';

/**
 * Cash flow statement dismension panel.
 * @returns
 */
export default function CashFlowStatementDimensionsPanel() {
  return (
    <CashFlowStatementDimensionsPanelProvider>
      <CashFlowStatementDimensionsPanelContent />
    </CashFlowStatementDimensionsPanelProvider>
  );
}

/**
 * Cash flow statement dismension panel content.
 * @returns
 */
function CashFlowStatementDimensionsPanelContent() {
  // Fetches the branches list.
  const { branches } = useCashFlowStatementDimensionsPanelContext();

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
