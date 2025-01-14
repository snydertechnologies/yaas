import {
  IRefundVendorCredit,
  IRefundVendorCreditCreatedPayload,
  IRefundVendorCreditCreatingPayload,
  IRefundVendorCreditDTO,
  IVendorCredit,
  IVendorCreditCreatePayload,
} from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import { BranchTransactionDTOTransform } from '@bigcapital/server/services/Branches/Integrations/BranchTransactionDTOTransform';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import * as R from 'ramda';
import { Inject, Service } from 'typedi';
import RefundVendorCredit from './RefundVendorCredit';

@Service()
export default class CreateRefundVendorCredit extends RefundVendorCredit {
  @Inject()
  tenancy: HasTenancyService;

  @Inject()
  uow: UnitOfWork;

  @Inject()
  eventPublisher: EventPublisher;

  @Inject()
  private branchDTOTransform: BranchTransactionDTOTransform;

  /**
   * Creates a refund vendor credit.
   * @param {number} tenantId
   * @param {number} vendorCreditId
   * @param {IRefundVendorCreditDTO} refundVendorCreditDTO
   * @returns {Promise<IRefundVendorCredit>}
   */
  public createRefund = async (
    tenantId: number,
    vendorCreditId: number,
    refundVendorCreditDTO: IRefundVendorCreditDTO,
  ): Promise<IRefundVendorCredit> => {
    const { RefundVendorCredit, Account, VendorCredit } = this.tenancy.models(tenantId);

    // Retrieve the vendor credit or throw not found service error.
    const vendorCredit = await VendorCredit.query().findById(vendorCreditId).throwIfNotFound();

    // Retrieve the deposit account or throw not found service error.
    const depositAccount = await Account.query().findById(refundVendorCreditDTO.depositAccountId).throwIfNotFound();

    // Validate vendor credit has remaining credit.
    this.validateVendorCreditRemainingCredit(vendorCredit, refundVendorCreditDTO.amount);
    // Validate refund deposit account type.
    this.validateRefundDepositAccountType(depositAccount);

    // Triggers `onVendorCreditRefundCreate` event.
    await this.eventPublisher.emitAsync(events.vendorCredit.onRefundCreate, {
      tenantId,
      vendorCreditId,
      refundVendorCreditDTO,
    } as IVendorCreditCreatePayload);

    const refundCreditObj = this.transformDTOToModel(tenantId, vendorCredit, refundVendorCreditDTO);
    // Saves refund vendor credit with associated transactions.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      const eventPayload = {
        vendorCredit,
        trx,
        tenantId,
        refundVendorCreditDTO,
      } as IRefundVendorCreditCreatingPayload;

      // Triggers `onVendorCreditRefundCreating` event.
      await this.eventPublisher.emitAsync(
        events.vendorCredit.onRefundCreating,
        eventPayload as IRefundVendorCreditCreatingPayload,
      );
      // Inserts refund vendor credit to the storage layer.
      const refundVendorCredit = await RefundVendorCredit.query().insertAndFetch({
        ...refundCreditObj,
      });
      // Triggers `onVendorCreditCreated` event.
      await this.eventPublisher.emitAsync(events.vendorCredit.onRefundCreated, {
        ...eventPayload,
        refundVendorCredit,
      } as IRefundVendorCreditCreatedPayload);

      return refundVendorCredit;
    });
  };

  /**
   * Transformes the refund DTO to refund vendor credit model.
   * @param   {IVendorCredit} vendorCredit -
   * @param   {IRefundVendorCreditDTO} vendorCreditDTO
   * @returns {IRefundVendorCredit}
   */
  public transformDTOToModel = (
    tenantId: number,
    vendorCredit: IVendorCredit,
    vendorCreditDTO: IRefundVendorCreditDTO,
  ) => {
    const initialDTO = {
      vendorCreditId: vendorCredit.id,
      ...vendorCreditDTO,
      currencyCode: vendorCredit.currencyCode,
      exchangeRate: vendorCreditDTO.exchangeRate || 1,
    };
    return R.compose(this.branchDTOTransform.transformDTO(tenantId))(initialDTO);
  };
}
