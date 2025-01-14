import { IModel, IView, IViewsService } from '@bigcapital/libs-backend';
import ResourceService from '@bigcapital/server/services/Resource/ResourceService';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';

@Service()
export default class ViewsService implements IViewsService {
  @Inject()
  tenancy: TenancyService;

  @Inject('logger')
  logger: any;

  @Inject()
  resourceService: ResourceService;

  /**
   * Listing resource views.
   * @param {number} tenantId -
   * @param {string} resourceModel -
   */
  public async listResourceViews(tenantId: number, resourceModelName: string): Promise<IView[]> {
    // Validate the resource model name is valid.
    const resourceModel = this.getResourceModelOrThrowError(tenantId, resourceModelName);
    // Default views.
    const defaultViews = resourceModel.getDefaultViews();

    return defaultViews;
  }

  /**
   * Retrieve resource model from resource name or throw not found error.
   * @param {number} tenantId
   * @param {number} resourceModel
   */
  private getResourceModelOrThrowError(tenantId: number, resourceModel: string): IModel {
    return this.resourceService.getResourceModel(tenantId, resourceModel);
  }
}
