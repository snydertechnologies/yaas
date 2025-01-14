// @ts-nocheck
import React, { useMemo } from 'react';
import '@bigcapital/webapp/style/components/Skeleton.scss';

import { randomNumber } from '@bigcapital/webapp/utils';

export function SkeletonText({ Tag = 'span', charsLength, minChars = 40, maxChars = 100 }) {
  const computedCharLength = useMemo(
    () => (charsLength ? charsLength : randomNumber(minChars, maxChars)),
    [charsLength, minChars, maxChars],
  );
  const randamText = 'X'.repeat(computedCharLength);

  return <Tag className={'skeleton'}>{randamText}</Tag>;
}
