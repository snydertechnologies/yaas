import AccountRepository from '@bigcapital/server/repositories/AccountRepository';
import AccountTransactionsRepository from '@bigcapital/server/repositories/AccountTransactionRepository';
import BillRepository from '@bigcapital/server/repositories/BillRepository';
import ContactRepository from '@bigcapital/server/repositories/ContactRepository';
import CustomerRepository from '@bigcapital/server/repositories/CustomerRepository';
import ExpenseEntryRepository from '@bigcapital/server/repositories/ExpenseEntryRepository';
import ExpenseRepository from '@bigcapital/server/repositories/ExpenseRepository';
import InventoryTransactionRepository from '@bigcapital/server/repositories/InventoryTransactionRepository';
import ItemRepository from '@bigcapital/server/repositories/ItemRepository';
import SaleInvoiceRepository from '@bigcapital/server/repositories/SaleInvoiceRepository';
import SettingRepository from '@bigcapital/server/repositories/SettingRepository';
import VendorRepository from '@bigcapital/server/repositories/VendorRepository';
import ViewRepository from '@bigcapital/server/repositories/ViewRepository';
import ViewRoleRepository from '@bigcapital/server/repositories/ViewRoleRepository';

export default (knex, cache, i18n) => {
  return {
    accountRepository: new AccountRepository(knex, cache, i18n),
    transactionsRepository: new AccountTransactionsRepository(knex, cache, i18n),
    customerRepository: new CustomerRepository(knex, cache, i18n),
    vendorRepository: new VendorRepository(knex, cache, i18n),
    contactRepository: new ContactRepository(knex, cache, i18n),
    expenseRepository: new ExpenseRepository(knex, cache, i18n),
    expenseEntryRepository: new ExpenseEntryRepository(knex, cache, i18n),
    viewRepository: new ViewRepository(knex, cache, i18n),
    viewRoleRepository: new ViewRoleRepository(knex, cache, i18n),
    settingRepository: new SettingRepository(knex, cache, i18n),
    billRepository: new BillRepository(knex, cache, i18n),
    saleInvoiceRepository: new SaleInvoiceRepository(knex, cache, i18n),
    itemRepository: new ItemRepository(knex, cache, i18n),
    inventoryTransactionRepository: new InventoryTransactionRepository(knex, cache, i18n),
  };
};
