import { Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { CellType } from '@bigcapital/webapp/constants';
import ProjectBillableEntries from '@bigcapital/webapp/containers/Projects/containers/ProjectBillableEntries';
import { Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

/**
 *
 * @return
 */
export function ProjectBillableEntriesCell() {
  const content = <ProjectBillableEntries />;
  return (
    <Popover2 content={content}>
      <Button icon={<Icon icon={'info'} iconSize={14} />} className="m12" minimal={true} />
    </Popover2>
  );
}

ProjectBillableEntriesCell.cellType = CellType.Button;
