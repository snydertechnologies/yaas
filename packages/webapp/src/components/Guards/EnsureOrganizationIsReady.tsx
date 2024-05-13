import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import withAuthentication from '@bigcapital/webapp/containers/Authentication/withAuthentication';
import withOrganization from '@bigcapital/webapp/containers/Organization/withOrganization';

function EnsureOrganizationIsReady({
  // #ownProps
  children,
  redirectTo = '/setup',

  // #withOrganizationByOrgId
  isOrganizationReady,
}) {
  return isOrganizationReady ? children : <Redirect to={{ pathname: redirectTo }} />;
}

export default compose(
  withAuthentication(),
  connect((state, props) => ({
    organizationId: props.currentOrganizationId,
  })),
  withOrganization(({ isOrganizationReady }) => ({ isOrganizationReady })),
)(EnsureOrganizationIsReady);
