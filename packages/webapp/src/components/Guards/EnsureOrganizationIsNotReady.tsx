import withAuthentication from '@bigcapital/webapp/containers/Authentication/withAuthentication';
import withOrganization from '@bigcapital/webapp/containers/Organization/withOrganization';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * Ensures organization is not ready.
 */
function EnsureOrganizationIsNotReady({
  children,

  // #withOrganization
  isOrganizationReady,
  isOrganizationSetupCompleted,
}) {
  return isOrganizationReady && !isOrganizationSetupCompleted ? <Redirect to={{ pathname: '/' }} /> : children;
}

export default compose(
  withAuthentication(({ currentOrganizationId }) => ({
    currentOrganizationId,
  })),
  connect((state, props) => ({
    organizationId: props.currentOrganizationId,
  })),
  withOrganization(({ isOrganizationReady, isOrganizationSetupCompleted }) => ({
    isOrganizationReady,
    isOrganizationSetupCompleted,
  })),
)(EnsureOrganizationIsNotReady);
