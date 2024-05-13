import { setGlobalErrors } from '@bigcapital/webapp/store/globalErrors/globalErrors.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  globalErrorsSet: (errors) => dispatch(setGlobalErrors(errors)),
});

export default connect(null, mapDispatchToProps);
