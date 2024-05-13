import config from '@bigcapital/server/config';
import { IAuthGetMetaPOJO } from '@bigcapital/server/interfaces';
import { Service } from 'typedi';

@Service()
export class GetAuthMeta {
  /**
   * Retrieves the authentication meta for SPA.
   * @returns {Promise<IAuthGetMetaPOJO>}
   */
  public async getAuthMeta(): Promise<IAuthGetMetaPOJO> {
    return {
      signupDisabled: config.signupRestrictions.disabled,
    };
  }
}
