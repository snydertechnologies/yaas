import { setSettings } from '@bigcapital/webapp/store/settings/settings.actions';
// @ts-nocheck
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetSettings = () => {
  const dispatch = useDispatch();

  return useCallback(
    (settings) => {
      dispatch(setSettings(settings));
    },
    [dispatch],
  );
};

/**
 * Retrieve the authentication token.
 */
export const useSettingsSelector = () => {
  return useSelector((state) => state.settings.data);
};
