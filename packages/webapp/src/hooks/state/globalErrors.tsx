import { setGlobalErrors } from '@bigcapital/webapp/store/globalErrors/globalErrors.actions';
// @ts-nocheck
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetGlobalErrors = () => {
  const dispatch = useDispatch();

  return useCallback(
    (errors) => {
      dispatch(setGlobalErrors(errors));
    },
    [dispatch],
  );
};

export const useGlobalErrors = () => {
  const globalErrors = useSelector((state) => state.globalErrors.data);

  return { globalErrors };
};
