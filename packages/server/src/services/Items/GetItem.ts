import { IItem } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject } from 'typedi';
import ItemTransformer from './ItemTransformer';

@Inject()
export class GetItem {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve the item details of the given id with associated details.
   * @param {number} tenantId
   * @param {number} itemId
   */
  public async getItem(tenantId: number, itemId: number): Promise<IItem> {
    const { Item } = this.tenancy.models(tenantId);

    const item = await Item.query()
      .findById(itemId)
      .withGraphFetched('sellAccount')
      .withGraphFetched('inventoryAccount')
      .withGraphFetched('category')
      .withGraphFetched('costAccount')
      .withGraphFetched('itemWarehouses.warehouse')
      .withGraphFetched('sellTaxRate')
      .withGraphFetched('purchaseTaxRate')
      .throwIfNotFound();

    return this.transformer.transform(tenantId, item, new ItemTransformer());
  }
}
