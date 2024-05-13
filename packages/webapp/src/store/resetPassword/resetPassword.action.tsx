// @ts-nocheck
import ApiService from '@bigcapital/webapp/services/ApiService';

export const submitResetPassword = (password) => {
  return (dispatch) => {
    return ApiService.post('auth/reset_password', password);
  };
};
