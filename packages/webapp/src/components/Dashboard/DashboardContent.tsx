import DashboardContentRoutes from '@bigcapital/webapp/components/Dashboard/DashboardContentRoute';
import DashboardTopbar from '@bigcapital/webapp/components/Dashboard/DashboardTopbar';
// @ts-nocheck
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardErrorBoundary from './DashboardErrorBoundary';

export default React.forwardRef(({}, ref) => {
  return (
    <ErrorBoundary FallbackComponent={DashboardErrorBoundary}>
      <div className="dashboard-content" id="dashboard" ref={ref}>
        <DashboardTopbar />
        <DashboardContentRoutes />
      </div>
    </ErrorBoundary>
  );
});
