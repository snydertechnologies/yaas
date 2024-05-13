import t from '@bigcapital/webapp/store/types';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapStateToProps = (state, props) => {
  return {};
};

export const mapDispatchToProps = (dispatch) => ({
  openDrawer: (name, payload) => dispatch({ type: t.OPEN_DRAWER, name, payload }),
  closeDrawer: (name, payload) => dispatch({ type: t.CLOSE_DRAWER, name, payload }),
});

export default connect(null, mapDispatchToProps);
