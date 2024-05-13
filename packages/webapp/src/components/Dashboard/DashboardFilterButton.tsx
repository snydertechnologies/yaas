import { Icon, T } from '@bigcapital/webapp/components';
import { Button, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

/**
 * Dashboard advanced filter button.
 */
export function DashboardFilterButton({ conditionsCount }) {
  return (
    <Button
      className={classNames(Classes.MINIMAL, 'button--filter', {
        'has-active-filters': conditionsCount > 0,
      })}
      text={conditionsCount > 0 ? intl.get('count_filters_applied', { count: conditionsCount }) : <T id={'filter'} />}
      icon={<Icon icon="filter-16" iconSize={16} />}
    />
  );
}
