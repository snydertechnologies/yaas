import { Position, Tooltip } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { Icon } from '../Icon';

import '@bigcapital/webapp/style/components/Hint.scss';
import { Tooltip2Props } from '@blueprintjs/popover2';

interface HintProps {
  content: string;
  position?: Position;
  iconSize?: number;
  tooltipProps?: Partial<Tooltip2Props>;
}

/**
 * Field hint.
 */
export function FieldHint({ content, position, iconSize = 12, tooltipProps }: HintProps) {
  return (
    <span className="hint">
      <Tooltip content={content} position={position} {...tooltipProps}>
        <Icon icon="info-circle" iconSize={iconSize} />
      </Tooltip>
    </span>
  );
}

export const Hint = FieldHint;
