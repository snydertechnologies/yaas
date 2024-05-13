import { FetchOptions, addSettings, submitOptions } from '@bigcapital/webapp/store/settings/settings.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  requestSubmitOptions: (form) => dispatch(submitOptions({ form })),
  requestFetchOptions: () => dispatch(FetchOptions({})),
  addSetting: (group, key, value) => dispatch(addSettings(group, key, value)),
});

export default connect(null, mapDispatchToProps);
