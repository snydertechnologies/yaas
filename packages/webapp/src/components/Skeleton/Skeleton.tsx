// @ts-nocheck
import React, { useMemo } from 'react';
import '@bigcapital/webapp/style/components/Skeleton.scss';

import { randomNumber } from '@bigcapital/webapp/utils';

/**
 * Skeleton component.
 */
export function Skeleton({ Tag = 'span', minWidth = 40, maxWidth = 100, children }) {
  const randomWidth = useMemo(() => randomNumber(minWidth, maxWidth), [minWidth, maxWidth]);
  return <Tag className={'skeleton'} style={{ width: `${randomWidth}%` }} children={children} />;
}
