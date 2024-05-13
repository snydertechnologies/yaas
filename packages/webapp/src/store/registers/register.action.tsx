// @ts-nocheck
import ApiService from '@bigcapital/webapp/services/ApiService';

export const submitRegister = ({ form }) => {
  return (dispatch) => {
    return ApiService.post('auth/register', { ...form });
  };
};
