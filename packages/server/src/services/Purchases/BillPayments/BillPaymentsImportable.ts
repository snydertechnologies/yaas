import { IBillPaymentDTO } from '@bigcapital/libs-backend';
import { Importable } from '@bigcapital/server/services/Import/Importable';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { CreateBillPayment } from './CreateBillPayment';
import { BillsPaymentsSampleData } from './constants';

@Service()
export class BillPaymentsImportable extends Importable {
  @Inject()
  private createBillPaymentService: CreateBillPayment;

  /**
   * Importing to account service.
   * @param {number} tenantId
   * @param {IAccountCreateDTO} createAccountDTO
   * @returns
   */
  public importable(tenantId: number, billPaymentDTO: IBillPaymentDTO, trx?: Knex.Transaction) {
    return this.createBillPaymentService.createBillPayment(tenantId, billPaymentDTO, trx);
  }

  /**
   * Concurrrency controlling of the importing process.
   * @returns {number}
   */
  public get concurrency() {
    return 1;
  }

  /**
   * Retrieves the sample data that used to download accounts sample sheet.
   */
  public sampleData(): any[] {
    return BillsPaymentsSampleData;
  }
}
