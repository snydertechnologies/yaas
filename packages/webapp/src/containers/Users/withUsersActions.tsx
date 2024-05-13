import {
  deleteUser,
  editUser,
  fetchUser,
  fetchUsers,
  inactiveUser,
  submitInvite,
} from '@bigcapital/webapp/store/users/users.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  requestFetchUsers: () => dispatch(fetchUsers({})),
  requestFetchUser: (id) => dispatch(fetchUser({ id })),
  requestDeleteUser: (id) => dispatch(deleteUser({ id })),
  requestInactiveUser: (id) => dispatch(inactiveUser({ id })),
  requestEditUser: (id, form) => dispatch(editUser({ form, id })),
  requestSubmitInvite: (form) => dispatch(submitInvite({ form })),
});

export default connect(null, mapDispatchToProps);
