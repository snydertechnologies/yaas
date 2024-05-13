import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import { CLASSES } from '@bigcapital/webapp/constants/classes';

// Dashboard card.
export function DashboardCard({ children, page }) {
  return (
    <div
      className={classNames(CLASSES.DASHBOARD_CARD, {
        [CLASSES.DASHBOARD_CARD_PAGE]: page,
      })}
    >
      {children}
    </div>
  );
}
