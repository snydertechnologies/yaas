// @ts-nocheck
import { connect } from 'react-redux';
import { setOrganizationSetupCompleted } from '@bigcapital/webapp/store/organizations/organizations.actions';

const mapDispatchToProps = (dispatch) => ({
  setOrganizationSetupCompleted: (congrats) => dispatch(setOrganizationSetupCompleted(congrats)),
});

export default connect(null, mapDispatchToProps);
