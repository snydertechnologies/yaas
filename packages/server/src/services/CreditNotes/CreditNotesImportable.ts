import { ICreditNoteNewDTO } from '@bigcapital/libs-backend';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { Importable } from '../Import/Importable';
import CreateCreditNote from './CreateCreditNote';

@Service()
export class CreditNotesImportable extends Importable {
  @Inject()
  private createCreditNoteImportable: CreateCreditNote;

  /**
   * Importing to account service.
   * @param {number} tenantId
   * @param {IAccountCreateDTO} createAccountDTO
   * @returns
   */
  public importable(tenantId: number, createAccountDTO: ICreditNoteNewDTO, trx?: Knex.Transaction) {
    return this.createCreditNoteImportable.newCreditNote(tenantId, createAccountDTO, trx);
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
    return [];
  }
}
