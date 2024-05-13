import { ServiceError } from '@bigcapital/server/exceptions';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject } from 'typedi';
import { ERRORS } from './constants';

export class CURDBranch {
  @Inject()
  tenancy: HasTenancyService;

  /**
   *
   * @param branch
   */
  throwIfBranchNotFound = (branch) => {
    if (!branch) {
      throw new ServiceError(ERRORS.BRANCH_NOT_FOUND);
    }
  };

  getBranchOrThrowNotFound = async (tenantId: number, branchId: number) => {
    const { Branch } = this.tenancy.models(tenantId);

    const foundBranch = await Branch.query().findById(branchId);

    if (!foundBranch) {
      throw new ServiceError(ERRORS.BRANCH_NOT_FOUND);
    }
    return foundBranch;
  };
}
