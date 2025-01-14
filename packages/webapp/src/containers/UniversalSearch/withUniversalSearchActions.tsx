import {
  universalSearchResetResourceType,
  universalSearchResetSelectedItem,
  universalSearchSetResourceType,
  universalSearchSetSelectedItem,
} from '@bigcapital/webapp/store/search/search.actions';
import t from '@bigcapital/webapp/store/types';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  openGlobalSearch: () => dispatch({ type: t.OPEN_SEARCH }),
  closeGlobalSearch: () => dispatch({ type: t.CLOSE_SEARCH }),

  setResourceTypeUniversalSearch: (resourceType) => dispatch(universalSearchSetResourceType(resourceType)),

  resetResourceTypeUniversalSearch: () => dispatch(universalSearchResetResourceType()),

  setSelectedItemUniversalSearch: (resourceType, resourceId) =>
    dispatch(universalSearchSetSelectedItem(resourceType, resourceId)),

  resetSelectedItemUniversalSearch: () => dispatch(universalSearchResetSelectedItem()),
});

export default connect(null, mapDispatchToProps);
