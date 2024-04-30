import { Inject, Service } from 'typedi';
import { Exportable } from '../Export/Exportable';
import { IExpensesFilter } from '@/interfaces';
import { ExpensesApplication } from './ExpensesApplication';

@Service()
export class ExpensesExportable extends Exportable {
  @Inject()
  private expensesApplication: ExpensesApplication;

  /**
   * Retrieves the accounts data to exportable sheet.
   * @param {number} tenantId
   * @returns
   */
  public exportable(tenantId: number, query: IExpensesFilter) {
    const parsedQuery = {
      ...query,
    } as IExpensesFilter;

    return this.expensesApplication
      .getExpenses(tenantId, parsedQuery)
      .then((output) => output.expenses);
  }
}
