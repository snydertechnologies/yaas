import { IProjectTimeGetPOJO } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';
import { TimeTransformer } from './TimeTransformer';

@Service()
export class GetTimeService {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve the tasks list.
   * @param {number} tenantId - Tenant Id.
   * @param {number} taskId - Task Id.
   * @returns {Promise<IProjectTimeGetPOJO>}
   */
  public getTime = async (tenantId: number, timeId: number): Promise<IProjectTimeGetPOJO> => {
    const { Time } = this.tenancy.models(tenantId);

    // Retrieve the project.
    const time = await Time.query()
      .findById(timeId)
      .withGraphFetched('project.contact')
      .withGraphFetched('task')
      .throwIfNotFound();

    // Transformes and returns object.
    return this.transformer.transform(tenantId, time, new TimeTransformer());
  };
}
