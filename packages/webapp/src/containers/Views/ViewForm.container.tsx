import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import { connect } from 'react-redux';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withResourceDetail from '@bigcapital/webapp/containers/Resources/withResourceDetails';
import withViewsDetails from '@bigcapital/webapp/containers/Views/withViewDetails';
import withViewsActions from '@bigcapital/webapp/containers/Views/withViewsActions';

const mapStateToProps = (state, ownProps) => {
  return {
    resourceName: ownProps.viewId ? ownProps.viewMeta.resource?.name : ownProps.resourceName,
  };
};

const viewFormConnect = connect(mapStateToProps);

export default compose(withDashboardActions, withViewsActions, withViewsDetails, viewFormConnect, withResourceDetail());
