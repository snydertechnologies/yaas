import {
  getResourceColumns,
  getResourceDataFactory,
  getResourceFieldsFactory,
  getResourceMetadata,
} from '@bigcapital/webapp/store/resources/resources.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getResourceFields = getResourceFieldsFactory();
  const getResourceData = getResourceDataFactory();

  const mapStateToProps = (state, props) => {
    const { resourceName } = props;

    const mapped = {
      resourceData: getResourceData(state, props),
      resourceFields: getResourceFields(state, props),
      resourceColumns: getResourceColumns(state, resourceName),
      resourceMetadata: getResourceMetadata(state, resourceName),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
