import { getDialogPayload } from '@bigcapital/webapp/store/dashboard/dashboard.reducer';
import { getUserDetails } from '@bigcapital/webapp/store/users/users.reducer';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapStateToProps = (state, props) => {
  const dialogPayload = getDialogPayload(state, 'user-form');

  return {
    dialogName: 'user-form',
    payload: { action: 'new', id: null },
    userDetails: dialogPayload.action === 'edit' ? getUserDetails(state, dialogPayload.user.id) : {},
  };
};

export default connect(mapStateToProps, null);
