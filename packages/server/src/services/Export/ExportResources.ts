import Container, { Service } from 'typedi';
import { AccountsExportable } from '../Accounts/AccountsExportable';
import { CustomersExportable } from '../Contacts/Customers/CustomersExportable';
import { VendorsExportable } from '../Contacts/Vendors/VendorsExportable';
import { CreditNotesExportable } from '../CreditNotes/CreditNotesExportable';
import { ExpensesExportable } from '../Expenses/ExpensesExportable';
import { ItemCategoriesExportable } from '../ItemCategories/ItemCategoriesExportable';
import { ItemsExportable } from '../Items/ItemsExportable';
import { ManualJournalsExportable } from '../ManualJournals/ManualJournalExportable';
import { BillPaymentExportable } from '../Purchases/BillPayments/BillPaymentExportable';
import { BillsExportable } from '../Purchases/Bills/BillsExportable';
import { VendorCreditsExportable } from '../Purchases/VendorCredits/VendorCreditsExportable';
import { SaleEstimatesExportable } from '../Sales/Estimates/SaleEstimatesExportable';
import { SaleInvoicesExportable } from '../Sales/Invoices/SaleInvoicesExportable';
import { PaymentsReceivedExportable } from '../Sales/PaymentReceives/PaymentsReceivedExportable';
import { SaleReceiptsExportable } from '../Sales/Receipts/SaleReceiptsExportable';
import { ExportableRegistry } from './ExportRegistery';

@Service()
export class ExportableResources {
  private static registry: ExportableRegistry;

  /**
   * Consttuctor method.
   */
  constructor() {
    this.boot();
  }

  /**
   * Importable instances.
   */
  private importables = [
    { resource: 'Account', exportable: AccountsExportable },
    { resource: 'Item', exportable: ItemsExportable },
    { resource: 'ItemCategory', exportable: ItemCategoriesExportable },
    { resource: 'Customer', exportable: CustomersExportable },
    { resource: 'Vendor', exportable: VendorsExportable },
    { resource: 'Expense', exportable: ExpensesExportable },
    { resource: 'SaleInvoice', exportable: SaleInvoicesExportable },
    { resource: 'SaleEstimate', exportable: SaleEstimatesExportable },
    { resource: 'SaleReceipt', exportable: SaleReceiptsExportable },
    { resource: 'Bill', exportable: BillsExportable },
    { resource: 'PaymentReceive', exportable: PaymentsReceivedExportable },
    { resource: 'BillPayment', exportable: BillPaymentExportable },
    { resource: 'ManualJournal', exportable: ManualJournalsExportable },
    { resource: 'CreditNote', exportable: CreditNotesExportable },
    { resource: 'VendorCredit', exportable: VendorCreditsExportable },
  ];

  /**
   *
   */
  public get registry() {
    return ExportableResources.registry;
  }

  /**
   * Boots all the registered importables.
   */
  public boot() {
    if (!ExportableResources.registry) {
      const instance = ExportableRegistry.getInstance();

      this.importables.forEach((importable) => {
        const importableInstance = Container.get(importable.exportable);
        instance.registerExportable(importable.resource, importableInstance);
      });
      ExportableResources.registry = instance;
    }
  }
}
