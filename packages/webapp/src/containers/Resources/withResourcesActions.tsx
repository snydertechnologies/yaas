import {
  fetchResourceColumns,
  fetchResourceData,
  fetchResourceFields,
} from '@bigcapital/webapp/store/resources/resources.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  requestFetchResourceFields: (resourceSlug) => dispatch(fetchResourceFields({ resourceSlug })),
  requestFetchResourceColumns: (resourceSlug) => dispatch(fetchResourceColumns({ resourceSlug })),
  requestResourceData: (resourceSlug) => dispatch(fetchResourceData({ resourceSlug })),
});

export default connect(null, mapDispatchToProps);
