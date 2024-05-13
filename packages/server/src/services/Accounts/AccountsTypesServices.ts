import { IAccountType, IAccountsTypesService } from '@bigcapital/server/interfaces';
import AccountTypesUtils from '@bigcapital/server/lib/AccountTypes';
import I18nService from '@bigcapital/server/services/I18n/I18nService';
import { Inject, Service } from 'typedi';

@Service()
export default class AccountsTypesService implements IAccountsTypesService {
  @Inject()
  i18nService: I18nService;

  /**
   * Retrieve all accounts types.
   * @param {number} tenantId -
   * @return {IAccountType}
   */
  public getAccountsTypes(tenantId: number): IAccountType[] {
    const accountTypes = AccountTypesUtils.getList();
    return this.i18nService.i18nMapper(accountTypes, ['label'], tenantId);
  }
}
