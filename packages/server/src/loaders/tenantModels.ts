import { mapValues } from 'lodash';

import Account from '@bigcapital/server/models/Account';
import AccountTransaction from '@bigcapital/server/models/AccountTransaction';
import Attachment from '@bigcapital/server/models/Attachment';
import Bill from '@bigcapital/server/models/Bill';
import BillLandedCost from '@bigcapital/server/models/BillLandedCost';
import BillLandedCostEntry from '@bigcapital/server/models/BillLandedCostEntry';
import BillPayment from '@bigcapital/server/models/BillPayment';
import BillPaymentEntry from '@bigcapital/server/models/BillPaymentEntry';
import Branch from '@bigcapital/server/models/Branch';
import CashflowAccount from '@bigcapital/server/models/CashflowAccount';
import CashflowTransaction from '@bigcapital/server/models/CashflowTransaction';
import CashflowTransactionLine from '@bigcapital/server/models/CashflowTransactionLine';
import Contact from '@bigcapital/server/models/Contact';
import CreditNote from '@bigcapital/server/models/CreditNote';
import CreditNoteAppliedInvoice from '@bigcapital/server/models/CreditNoteAppliedInvoice';
import Currency from '@bigcapital/server/models/Currency';
import Customer from '@bigcapital/server/models/Customer';
import ExchangeRate from '@bigcapital/server/models/ExchangeRate';
import Expense from '@bigcapital/server/models/Expense';
import ExpenseCategory from '@bigcapital/server/models/ExpenseCategory';
import InventoryAdjustment from '@bigcapital/server/models/InventoryAdjustment';
import InventoryAdjustmentEntry from '@bigcapital/server/models/InventoryAdjustmentEntry';
import InventoryCostLotTracker from '@bigcapital/server/models/InventoryCostLotTracker';
import InventoryTransaction from '@bigcapital/server/models/InventoryTransaction';
import Item from '@bigcapital/server/models/Item';
import ItemCategory from '@bigcapital/server/models/ItemCategory';
import ItemEntry from '@bigcapital/server/models/ItemEntry';
import ItemWarehouseQuantity from '@bigcapital/server/models/ItemWarehouseQuantity';
import ManualJournal from '@bigcapital/server/models/ManualJournal';
import ManualJournalEntry from '@bigcapital/server/models/ManualJournalEntry';
import Media from '@bigcapital/server/models/Media';
import MediaLink from '@bigcapital/server/models/MediaLink';
import Option from '@bigcapital/server/models/Option';
import PaymentReceive from '@bigcapital/server/models/PaymentReceive';
import PaymentReceiveEntry from '@bigcapital/server/models/PaymentReceiveEntry';
import PlaidItem from '@bigcapital/server/models/PlaidItem';
import Project from '@bigcapital/server/models/Project';
import RefundCreditNote from '@bigcapital/server/models/RefundCreditNote';
import RefundVendorCredit from '@bigcapital/server/models/RefundVendorCredit';
import Role from '@bigcapital/server/models/Role';
import RolePermission from '@bigcapital/server/models/RolePermission';
import SaleEstimate from '@bigcapital/server/models/SaleEstimate';
import SaleEstimateEntry from '@bigcapital/server/models/SaleEstimateEntry';
import SaleInvoice from '@bigcapital/server/models/SaleInvoice';
import SaleInvoiceEntry from '@bigcapital/server/models/SaleInvoiceEntry';
import SaleReceipt from '@bigcapital/server/models/SaleReceipt';
import SaleReceiptEntry from '@bigcapital/server/models/SaleReceiptEntry';
import Setting from '@bigcapital/server/models/Setting';
import Task from '@bigcapital/server/models/Task';
import TaxRate from '@bigcapital/server/models/TaxRate';
import TaxRateTransaction from '@bigcapital/server/models/TaxRateTransaction';
import Time from '@bigcapital/server/models/Time';
import UncategorizedCashflowTransaction from '@bigcapital/server/models/UncategorizedCashflowTransaction';
import User from '@bigcapital/server/models/User';
import Vendor from '@bigcapital/server/models/Vendor';
import VendorCredit from '@bigcapital/server/models/VendorCredit';
import VendorCreditAppliedBill from '@bigcapital/server/models/VendorCreditAppliedBill';
import View from '@bigcapital/server/models/View';
import ViewColumn from '@bigcapital/server/models/ViewColumn';
import ViewRole from '@bigcapital/server/models/ViewRole';
import Warehouse from '@bigcapital/server/models/Warehouse';
import WarehouseTransfer from '@bigcapital/server/models/WarehouseTransfer';
import WarehouseTransferEntry from '@bigcapital/server/models/WarehouseTransferEntry';

export default (knex) => {
  const models = {
    Option,
    Account,
    AccountTransaction,
    Item,
    ItemCategory,
    ItemEntry,
    ManualJournal,
    ManualJournalEntry,
    Bill,
    BillPayment,
    BillPaymentEntry,
    Currency,
    ExchangeRate,
    Expense,
    ExpenseCategory,
    View,
    ViewRole,
    ViewColumn,
    Setting,
    SaleInvoice,
    SaleInvoiceEntry,
    SaleReceipt,
    SaleReceiptEntry,
    SaleEstimate,
    SaleEstimateEntry,
    PaymentReceive,
    PaymentReceiveEntry,
    InventoryTransaction,
    InventoryCostLotTracker,
    Media,
    MediaLink,
    Vendor,
    Customer,
    Contact,
    InventoryAdjustment,
    InventoryAdjustmentEntry,
    BillLandedCost,
    BillLandedCostEntry,
    CashflowTransaction,
    CashflowTransactionLine,
    CashflowAccount,
    Role,
    RolePermission,
    User,
    VendorCredit,
    CreditNote,
    RefundCreditNote,
    RefundVendorCredit,
    CreditNoteAppliedInvoice,
    VendorCreditAppliedBill,
    Branch,
    Warehouse,
    WarehouseTransfer,
    WarehouseTransferEntry,
    ItemWarehouseQuantity,
    Project,
    Time,
    Task,
    TaxRate,
    TaxRateTransaction,
    Attachment,
    PlaidItem,
    UncategorizedCashflowTransaction,
  };
  return mapValues(models, (model) => model.bindKnex(knex));
};
