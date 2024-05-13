import { getCurrentOrganizationFactory } from '@bigcapital/webapp/store/authentication/authentication.selectors';
import { setOrganizations } from '@bigcapital/webapp/store/organizations/organizations.actions';
// @ts-nocheck
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetOrganizations = () => {
  const dispatch = useDispatch();

  return useCallback(
    (organizations) => {
      dispatch(setOrganizations(organizations));
    },
    [dispatch],
  );
};

export const useCurrentOrganization = () => {
  return useSelector(getCurrentOrganizationFactory());
};
