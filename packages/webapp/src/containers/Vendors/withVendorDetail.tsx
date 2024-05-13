import { getVendorByIdFactory } from '@bigcapital/webapp/store/vendors/vendors.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getVendorById = getVendorByIdFactory();
  const mapStateToProps = (state, props) => ({
    vendor: getVendorById(state, props),
  });
  return connect(mapStateToProps);
};
