import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

/**
 * Dashboard content table.
 */
export function DashboardContentTable({ children }) {
  return <div className={classNames(CLASSES.DASHBOARD_DATATABLE)}>{children}</div>;
}
