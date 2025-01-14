import { IExpense, IExpensesFilter, IFilterMeta, IPaginationMeta } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import DynamicListingService from '@bigcapital/server/services/DynamicListing/DynamicListService';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import * as R from 'ramda';
import { Inject, Service } from 'typedi';
import { ExpenseTransfromer } from './ExpenseTransformer';

@Service()
export class GetExpenses {
  @Inject()
  private dynamicListService: DynamicListingService;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve expenses paginated list.
   * @param  {number} tenantId
   * @param  {IExpensesFilter} expensesFilter
   * @return {IExpense[]}
   */
  public getExpensesList = async (
    tenantId: number,
    filterDTO: IExpensesFilter,
  ): Promise<{
    expenses: IExpense[];
    pagination: IPaginationMeta;
    filterMeta: IFilterMeta;
  }> => {
    const { Expense } = this.tenancy.models(tenantId);

    // Parses list filter DTO.
    const filter = this.parseListFilterDTO(filterDTO);

    // Dynamic list service.
    const dynamicList = await this.dynamicListService.dynamicList(tenantId, Expense, filter);
    // Retrieves the paginated results.
    const { results, pagination } = await Expense.query()
      .onBuild((builder) => {
        builder.withGraphFetched('paymentAccount');
        builder.withGraphFetched('categories.expenseAccount');

        dynamicList.buildQuery()(builder);
      })
      .pagination(filter.page - 1, filter.pageSize);

    // Transformes the expenses models to POJO.
    const expenses = await this.transformer.transform(tenantId, results, new ExpenseTransfromer());
    return {
      expenses,
      pagination,
      filterMeta: dynamicList.getResponseMeta(),
    };
  };

  /**
   * Parses filter DTO of expenses list.
   * @param filterDTO -
   */
  private parseListFilterDTO(filterDTO) {
    return R.compose(this.dynamicListService.parseStringifiedFilter)(filterDTO);
  }
}
