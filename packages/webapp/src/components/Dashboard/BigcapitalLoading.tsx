import { Icon } from '@bigcapital/webapp/components';
import classNames from 'classnames';
import React from 'react';

import '@bigcapital/webapp/style/components/BigcapitalLoading.scss';

/**
 * Bigcapital logo loading.
 */
export default function BigcapitalLoading({ className }: { className: string }) {
  return (
    <div className={classNames('bigcapital-loading', className)}>
      <div className="center">
        <Icon icon="bigcapital" height={37} width={228} />
      </div>
    </div>
  );
}
