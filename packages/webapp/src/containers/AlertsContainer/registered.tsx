// @ts-nocheck
import AccountsAlerts from '@bigcapital/webapp/containers/Accounts/AccountsAlerts';
import ItemsAlerts from '@bigcapital/webapp/containers/Items/ItemsAlerts';
import ItemsCategoriesAlerts from '@bigcapital/webapp/containers/ItemsCategories/ItemsCategoriesAlerts';
import InventoryAdjustmentsAlerts from '@bigcapital/webapp/containers/InventoryAdjustments/InventoryAdjustmentsAlerts';
import EstimatesAlerts from '@bigcapital/webapp/containers/Sales/Estimates/EstimatesAlerts';
import InvoicesAlerts from '@bigcapital/webapp/containers/Sales/Invoices/InvoicesAlerts';
import ReceiptsAlerts from '@bigcapital/webapp/containers/Sales/Receipts/ReceiptsAlerts';
import PaymentReceiveAlerts from '@bigcapital/webapp/containers/Sales/PaymentReceives/PaymentReceiveAlerts';
import BillsAlerts from '@bigcapital/webapp/containers/Purchases/Bills/BillsLanding/BillsAlerts';
import PaymentMadesAlerts from '@bigcapital/webapp/containers/Purchases/PaymentMades/PaymentMadesAlerts';
import CustomersAlerts from '@bigcapital/webapp/containers/Customers/CustomersAlerts';
import VendorsAlerts from '@bigcapital/webapp/containers/Vendors/VendorsAlerts';
import ManualJournalsAlerts from '@bigcapital/webapp/containers/Accounting/JournalsLanding/ManualJournalsAlerts';
import ExpensesAlerts from '@bigcapital/webapp/containers/Expenses/ExpensesAlerts';
import AccountTransactionsAlerts from '@bigcapital/webapp/containers/CashFlow/AccountTransactions/AccountTransactionsAlerts';
import UsersAlerts from '@bigcapital/webapp/containers/Preferences/Users/UsersAlerts';
import CurrenciesAlerts from '@bigcapital/webapp/containers/Preferences/Currencies/CurrenciesAlerts';
import RolesAlerts from '@bigcapital/webapp/containers/Preferences/Users/Roles/RolesAlerts';
import CreditNotesAlerts from '@bigcapital/webapp/containers/Sales/CreditNotes/CreditNotesAlerts';
import VendorCreditNotesAlerts from '@bigcapital/webapp/containers/Purchases/CreditNotes/VendorCreditNotesAlerts';
import TransactionsLockingAlerts from '@bigcapital/webapp/containers/TransactionsLocking/TransactionsLockingAlerts';
import WarehousesAlerts from '@bigcapital/webapp/containers/Preferences/Warehouses/WarehousesAlerts';
import WarehousesTransfersAlerts from '@bigcapital/webapp/containers/WarehouseTransfers/WarehousesTransfersAlerts';
import BranchesAlerts from '@bigcapital/webapp/containers/Preferences/Branches/BranchesAlerts';
import ProjectAlerts from '@bigcapital/webapp/containers/Projects/containers/ProjectAlerts';
import TaxRatesAlerts from '@bigcapital/webapp/containers/TaxRates/alerts';
import { CashflowAlerts } from '../CashFlow/CashflowAlerts';

export default [
  ...AccountsAlerts,
  ...ItemsAlerts,
  ...ItemsCategoriesAlerts,
  ...InventoryAdjustmentsAlerts,
  ...EstimatesAlerts,
  ...InvoicesAlerts,
  ...ReceiptsAlerts,
  ...PaymentReceiveAlerts,
  ...BillsAlerts,
  ...PaymentMadesAlerts,
  ...CustomersAlerts,
  ...VendorsAlerts,
  ...ManualJournalsAlerts,
  ...ExpensesAlerts,
  ...AccountTransactionsAlerts,
  ...UsersAlerts,
  ...CurrenciesAlerts,
  ...RolesAlerts,
  ...CreditNotesAlerts,
  ...VendorCreditNotesAlerts,
  ...TransactionsLockingAlerts,
  ...WarehousesAlerts,
  ...WarehousesTransfersAlerts,
  ...BranchesAlerts,
  ...ProjectAlerts,
  ...TaxRatesAlerts,
  ...CashflowAlerts,
];
