import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
// @ts-nocheck
import React, { useEffect } from 'react';

import HomepageContent from './HomepageContent';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Dashboard homepage.
 */
function DashboardHomepage({
  // #withDashboardActions
  changePageTitle,

  // #withCurrentOrganization
  organization,
}) {
  useEffect(() => {
    changePageTitle(organization.name);
  }, [organization.name, changePageTitle]);

  return (
    <DashboardInsider name="homepage">
      <HomepageContent />
    </DashboardInsider>
  );
}

export default compose(
  withDashboardActions,
  withCurrentOrganization(({ organization }) => ({ organization })),
)(DashboardHomepage);
