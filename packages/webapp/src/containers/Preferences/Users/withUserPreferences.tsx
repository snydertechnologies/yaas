import t from '@bigcapital/webapp/store/types';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapStateToProps = (state, props) => {};

export const mapDispatchToProps = (dispatch) => ({
  openDialog: (name, payload) => dispatch({ type: t.OPEN_DIALOG, name, payload }),
  closeDialog: (name, payload) => dispatch({ type: t.CLOSE_DIALOG, name, payload }),
});

export default connect(null, mapDispatchToProps);
