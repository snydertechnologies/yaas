// @ts-nocheck
import { connect } from 'react-redux';
import { submitMedia, deleteMedia } from '@bigcapital/webapp/store/media/media.actions';

export const mapDispatchToProps = (dispatch) => ({
  requestSubmitMedia: (form, config) => dispatch(submitMedia({ form, config })),
  requestDeleteMedia: (ids) => dispatch(deleteMedia({ ids })),
});

export default connect(null, mapDispatchToProps);
