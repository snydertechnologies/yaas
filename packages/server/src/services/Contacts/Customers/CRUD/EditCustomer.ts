import {
  ICustomer,
  ICustomerEditDTO,
  ICustomerEventEditedPayload,
  ICustomerEventEditingPayload,
} from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { CreateEditCustomerDTO } from './CreateEditCustomerDTO';

@Service()
export class EditCustomer {
  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private customerDTO: CreateEditCustomerDTO;

  /**
   * Edits details of the given customer.
   * @param {number} tenantId
   * @param {number} customerId
   * @param {ICustomerEditDTO} customerDTO
   * @return {Promise<ICustomer>}
   */
  public async editCustomer(tenantId: number, customerId: number, customerDTO: ICustomerEditDTO): Promise<ICustomer> {
    const { Contact } = this.tenancy.models(tenantId);

    // Retrieve the vendor or throw not found error.
    const oldCustomer = await Contact.query().findById(customerId).modify('customer').throwIfNotFound();

    // Transformes the given customer DTO to object.
    const customerObj = this.customerDTO.transformEditDTO(customerDTO);

    // Edits the given customer under unit-of-work evnirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onCustomerEditing` event.
      await this.eventPublisher.emitAsync(events.customers.onEditing, {
        tenantId,
        customerDTO,
        customerId,
        trx,
      } as ICustomerEventEditingPayload);

      // Edits the customer details on the storage.
      const customer = await Contact.query().updateAndFetchById(customerId, {
        ...customerObj,
      });
      // Triggers `onCustomerEdited` event.
      await this.eventPublisher.emitAsync(events.customers.onEdited, {
        customerId,
        customer,
        trx,
      } as ICustomerEventEditedPayload);

      return customer;
    });
  }
}
