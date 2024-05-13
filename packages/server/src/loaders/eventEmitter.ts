import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';

import { AccountsTransactionsWarehousesSubscribe } from '@bigcapital/server/services/Accounting/AccountsTransactionsWarehousesSubscribe';
import { MutateBaseCurrencyAccountsSubscriber } from '@bigcapital/server/services/Accounts/susbcribers/MutateBaseCurrencyAccounts';
import { SendVerfiyMailOnSignUp } from '@bigcapital/server/services/Authentication/events/SendVerfiyMailOnSignUp';
import { PlaidUpdateTransactionsOnItemCreatedSubscriber } from '@bigcapital/server/services/Banking/Plaid/subscribers/PlaidUpdateTransactionsOnItemCreatedSubscriber';
import BranchesIntegrationsSubscribers from '@bigcapital/server/services/Branches/EventsProvider';
import CashflowTransactionSubscriber from '@bigcapital/server/services/Cashflow/CashflowTransactionSubscriber';
import CashflowWithAccountSubscriber from '@bigcapital/server/services/Cashflow/CashflowWithAccountSubscriber';
import { DeleteCashflowTransactionOnUncategorize } from '@bigcapital/server/services/Cashflow/subscribers/DeleteCashflowTransactionOnUncategorize';
import { PreventDeleteTransactionOnDelete } from '@bigcapital/server/services/Cashflow/subscribers/PreventDeleteTransactionsOnDelete';
import { CustomerWriteGLOpeningBalanceSubscriber } from '@bigcapital/server/services/Contacts/Customers/Subscribers/CustomerGLEntriesSubscriber';
import { VendorsWriteGLOpeningSubscriber } from '@bigcapital/server/services/Contacts/Vendors/Subscribers/VendorGLEntriesSubscriber';
import CreditNoteApplySyncCreditSubscriber from '@bigcapital/server/services/CreditNotes/CreditNoteApplySyncCreditSubscriber';
import CreditNoteApplySyncInvoicesCreditedAmountSubscriber from '@bigcapital/server/services/CreditNotes/CreditNoteApplySyncInvoicesSubscriber';
import CreditNoteAutoSerialSubscriber from '@bigcapital/server/services/CreditNotes/CreditNoteAutoSerialSubscriber';
import CreditNoteGLEntriesSubscriber from '@bigcapital/server/services/CreditNotes/CreditNoteGLEntriesSubscriber';
import CreditNoteInventoryTransactionsSubscriber from '@bigcapital/server/services/CreditNotes/CreditNoteInventoryTransactionsSubscriber';
import DeleteCustomerLinkedCreditSubscriber from '@bigcapital/server/services/CreditNotes/DeleteCustomerLinkedCreditSubscriber';
import RefundCreditNoteGLEntriesSubscriber from '@bigcapital/server/services/CreditNotes/RefundCreditNoteGLEntriesSubscriber';
import RefundSyncCreditNoteBalanceSubscriber from '@bigcapital/server/services/CreditNotes/RefundSyncCreditNoteBalanceSubscriber';
import { SeedInitialCurrenciesOnSetupSubsriber } from '@bigcapital/server/services/Currencies/subscribers/SeedInitialCurrenciesOnSetupSubscriber';
import { ExpensesWriteGLSubscriber } from '@bigcapital/server/services/Expenses/ExpenseGLEntriesSubscriber';
import { InventoryCostGLBeforeWriteSubscriber } from '@bigcapital/server/services/Inventory/subscribers/InventoryCostGLBeforeWriteSubscriber';
import InviteSendMainNotification from '@bigcapital/server/services/InviteUsers/InviteSendMailNotificationSubscribe';
import SyncSystemSendInvite from '@bigcapital/server/services/InviteUsers/SyncSystemSendInvite';
import SyncTenantAcceptInvite from '@bigcapital/server/services/InviteUsers/SyncTenantAcceptInvite';
import { ManualJournalWriteGLSubscriber } from '@bigcapital/server/services/ManualJournals/ManualJournalGLEntriesSubscriber';
import { ProjectBillableBillSubscriber } from '@bigcapital/server/services/Projects/Projects/ProjectBillableBillSubscriber';
import { ProjectBillableExpensesSubscriber } from '@bigcapital/server/services/Projects/Projects/ProjectBillableExpenseSubscriber';
import { ProjectBillableTasksSubscriber } from '@bigcapital/server/services/Projects/Projects/ProjectBillableTasksSubscriber';
import { SyncActualTimeTaskSubscriber } from '@bigcapital/server/services/Projects/Times/SyncActualTimeTaskSubscriber';
import { PaymentWriteGLEntriesSubscriber } from '@bigcapital/server/services/Purchases/BillPayments/BillPaymentGLEntriesSubscriber';
import { BillGLEntriesSubscriber } from '@bigcapital/server/services/Purchases/Bills/BillGLEntriesSubscriber';
import { BillPaymentsGLEntriesRewriteSubscriber } from '@bigcapital/server/services/Purchases/Bills/BillPaymentsGLEntriesRewriteSubscriber';
import LandedCostGLEntriesSubscriber from '@bigcapital/server/services/Purchases/LandedCost/LandedCostGLEntriesSubscriber';
import LandedCostInventoryTransactionsSubscriber from '@bigcapital/server/services/Purchases/LandedCost/LandedCostInventoryTransactionsSubscriber';
import LandedCostSyncCostTransactionsSubscriber from '@bigcapital/server/services/Purchases/LandedCost/LandedCostSyncCostTransactionsSubscriber';
import ApplyVendorCreditSyncBillsSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/ApplyVendorCreditToBills/ApplyVendorCreditSyncBillsSubscriber';
import ApplyVendorCreditSyncInvoicedSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/ApplyVendorCreditToBills/ApplyVendorCreditSyncInvoicedSubscriber';
import DeleteVendorAssociatedVendorCredit from '@bigcapital/server/services/Purchases/VendorCredits/DeleteVendorAssociatedVendorCredit';
import RefundSyncVendorCreditBalanceSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/RefundVendorCredits/RefundSyncVendorCreditBalanceSubscriber';
import RefundVendorCreditGLEntriesSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/RefundVendorCredits/RefundVendorCreditGLEntriesSubscriber';
import VendorCreditAutoSerialSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/VendorCreditAutoSerialSubscriber';
import VendorCreditGlEntriesSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/VendorCreditGLEntriesSubscriber';
import VendorCreditInventoryTransactionsSubscriber from '@bigcapital/server/services/Purchases/VendorCredits/VendorCreditInventoryTransactionsSusbcriber';
import PurgeAuthorizedUserOnceRoleMutate from '@bigcapital/server/services/Roles/PurgeAuthorizedUser';
import { SaleEstimateMarkApprovedOnMailSent } from '@bigcapital/server/services/Sales/Estimates/subscribers/SaleEstimateMarkApprovedOnMailSent';
import SaleInvoiceWriteoffSubscriber from '@bigcapital/server/services/Sales/Invoices/SaleInvoiceWriteoffSubscriber';
import { InvoiceChangeStatusOnMailSentSubscriber } from '@bigcapital/server/services/Sales/Invoices/subscribers/InvoiceChangeStatusOnMailSentSubscriber';
import { InvoiceCostGLEntriesSubscriber } from '@bigcapital/server/services/Sales/Invoices/subscribers/InvoiceCostGLEntriesSubscriber';
import { InvoicePaymentGLRewriteSubscriber } from '@bigcapital/server/services/Sales/Invoices/subscribers/InvoicePaymentGLRewriteSubscriber';
import { SaleReceiptCostGLEntriesSubscriber } from '@bigcapital/server/services/Sales/Receipts/subscribers/SaleReceiptCostGLEntriesSubscriber';
import { SaleReceiptMarkClosedOnMailSentSubcriber } from '@bigcapital/server/services/Sales/Receipts/subscribers/SaleReceiptMarkClosedOnMailSentSubcriber';
import { SubscribeFreeOnSignupCommunity } from '@bigcapital/server/services/Subscription/events/SubscribeFreeOnSignupCommunity';
import { SyncItemTaxRateOnEditTaxSubscriber } from '@bigcapital/server/services/TaxRates/SyncItemTaxRateOnEditTaxSubscriber';
import { BillTaxRateValidateSubscriber } from '@bigcapital/server/services/TaxRates/subscribers/BillTaxRateValidateSubscriber';
import { SaleInvoiceTaxRateValidateSubscriber } from '@bigcapital/server/services/TaxRates/subscribers/SaleInvoiceTaxRateValidateSubscriber';
import { WriteBillTaxTransactionsSubscriber } from '@bigcapital/server/services/TaxRates/subscribers/WriteBillTaxTransactionsSubscriber';
import { WriteInvoiceTaxTransactionsSubscriber } from '@bigcapital/server/services/TaxRates/subscribers/WriteInvoiceTaxTransactionsSubscriber';
import FinancialTransactionLockingGuardSubscriber from '@bigcapital/server/services/TransactionsLocking/FinancialsTransactionLockingGuardSubscriber';
import PurchasesTransactionLockingGuardSubscriber from '@bigcapital/server/services/TransactionsLocking/PurchasesTransactionLockingGuardSubscriber';
import SalesTransactionLockingGuardSubscriber from '@bigcapital/server/services/TransactionsLocking/SalesTransactionLockingGuardSubscriber';
import PurgeUserAbilityCache from '@bigcapital/server/services/Users/PurgeUserAbilityCache';
import { SyncTenantUserDelete } from '@bigcapital/server/services/Users/SyncTenantUserDeleted';
import SyncTenantUserMutate from '@bigcapital/server/services/Users/SyncTenantUserSaved';
import { ActivateWarehousesSubscriber } from '@bigcapital/server/services/Warehouses/ActivateWarehousesSubscriber';
import WarehousesIntegrationsSubscribers from '@bigcapital/server/services/Warehouses/EventsProvider';
import { WarehousesItemsQuantitySyncSubscriber } from '@bigcapital/server/services/Warehouses/Integrations/WarehousesItemsQuantitySynSubscriber';
import { WarehouseTransferAutoIncrementSubscriber } from '@bigcapital/server/services/Warehouses/WarehousesTransfers/WarehouseTransferAutoIncrementSubscriber';
import { WarehouseTransferInventoryTransactionsSubscriber } from '@bigcapital/server/services/Warehouses/WarehousesTransfers/WarehouseTransferInventoryTransactionsSubscriber';
import ResetLoginThrottleSubscriber from '@bigcapital/server/subscribers/Authentication/ResetLoginThrottle';
import AuthenticationSubscriber from '@bigcapital/server/subscribers/Authentication/SendResetPasswordMail';
import BillWriteInventoryTransactionsSubscriber from '@bigcapital/server/subscribers/Bills/WriteInventoryTransactions';
import InventorySubscriber from '@bigcapital/server/subscribers/Inventory/Inventory';
import InventoryAdjustmentsSubscriber from '@bigcapital/server/subscribers/Inventory/InventoryAdjustment';
import OrgBuildSmsNotificationSubscriber from '@bigcapital/server/subscribers/Organization/BuildSmsNotification';
import OrgSyncTenantAdminUserSubscriber from '@bigcapital/server/subscribers/Organization/SyncTenantAdminUser';
import PaymentSyncBillBalance from '@bigcapital/server/subscribers/PaymentMades/PaymentSyncBillBalance';
import PaymentReceiveAutoSerialSubscriber from '@bigcapital/server/subscribers/PaymentReceive/AutoSerialIncrement';
import PaymentReceiveSyncInvoices from '@bigcapital/server/subscribers/PaymentReceive/PaymentReceiveSyncInvoices';
import SendSmsNotificationPaymentReceive from '@bigcapital/server/subscribers/PaymentReceive/SendSmsNotificationToCustomer';
import PaymentReceivesWriteGLEntriesSubscriber from '@bigcapital/server/subscribers/PaymentReceive/WriteGLEntries';
import SaleEstimateAutoSerialSubscriber from '@bigcapital/server/subscribers/SaleEstimate/AutoIncrementSerial';
import SaleEstimateSmsNotificationSubscriber from '@bigcapital/server/subscribers/SaleEstimate/SmsNotifications';
import SaleInvoiceAutoIncrementSubscriber from '@bigcapital/server/subscribers/SaleInvoices/AutoIncrementSerial';
import SaleInvoiceConvertFromEstimateSubscriber from '@bigcapital/server/subscribers/SaleInvoices/ConvertFromEstimate';
import SendSmsNotificationToCustomer from '@bigcapital/server/subscribers/SaleInvoices/SendSmsNotificationToCustomer';
import SaleInvoiceWriteInventoryTransactions from '@bigcapital/server/subscribers/SaleInvoices/WriteInventoryTransactions';
import SaleInvoiceWriteGLEntriesSubscriber from '@bigcapital/server/subscribers/SaleInvoices/WriteJournalEntries';
import SaleReceiptAutoSerialSubscriber from '@bigcapital/server/subscribers/SaleReceipt/AutoIncrementSerial';
import SendSmsNotificationSaleReceipt from '@bigcapital/server/subscribers/SaleReceipt/SendSmsNotificationToCustomer';
import SaleReceiptInventoryTransactionsSubscriber from '@bigcapital/server/subscribers/SaleReceipt/WriteInventoryTransactions';
import SaleReceiptWriteGLEntriesSubscriber from '@bigcapital/server/subscribers/SaleReceipt/WriteJournalEntries';

export default () => {
  return new EventPublisher();
};

export const susbcribers = () => {
  return [
    InventoryAdjustmentsSubscriber,
    BillWriteInventoryTransactionsSubscriber,
    PaymentSyncBillBalance,
    SaleReceiptInventoryTransactionsSubscriber,
    SaleReceiptWriteGLEntriesSubscriber,
    SaleInvoiceWriteInventoryTransactions,
    SaleInvoiceWriteGLEntriesSubscriber,
    PaymentReceiveSyncInvoices,
    PaymentReceivesWriteGLEntriesSubscriber,
    CashflowTransactionSubscriber,
    InventorySubscriber,
    CustomerWriteGLOpeningBalanceSubscriber,
    VendorsWriteGLOpeningSubscriber,

    // # Estimate
    SaleEstimateAutoSerialSubscriber,
    SaleEstimateSmsNotificationSubscriber,
    SaleEstimateMarkApprovedOnMailSent,

    ExpensesWriteGLSubscriber,
    SaleReceiptAutoSerialSubscriber,
    SaleInvoiceAutoIncrementSubscriber,
    SaleInvoiceConvertFromEstimateSubscriber,
    PaymentReceiveAutoSerialSubscriber,
    SyncSystemSendInvite,
    SyncTenantAcceptInvite,
    InviteSendMainNotification,
    SyncTenantUserMutate,
    SyncTenantUserDelete,
    OrgSyncTenantAdminUserSubscriber,
    OrgBuildSmsNotificationSubscriber,
    PurgeUserAbilityCache,
    ResetLoginThrottleSubscriber,
    AuthenticationSubscriber,
    PurgeAuthorizedUserOnceRoleMutate,
    SendSmsNotificationToCustomer,
    SendSmsNotificationSaleReceipt,
    SendSmsNotificationPaymentReceive,
    SaleInvoiceWriteoffSubscriber,
    LandedCostSyncCostTransactionsSubscriber,
    LandedCostInventoryTransactionsSubscriber,
    CreditNoteGLEntriesSubscriber,
    VendorCreditGlEntriesSubscriber,
    CreditNoteInventoryTransactionsSubscriber,
    VendorCreditInventoryTransactionsSubscriber,
    CreditNoteAutoSerialSubscriber,
    VendorCreditAutoSerialSubscriber,
    LandedCostGLEntriesSubscriber,
    RefundCreditNoteGLEntriesSubscriber,
    RefundVendorCreditGLEntriesSubscriber,
    RefundSyncCreditNoteBalanceSubscriber,
    RefundSyncVendorCreditBalanceSubscriber,
    CreditNoteApplySyncCreditSubscriber,
    CreditNoteApplySyncInvoicesCreditedAmountSubscriber,
    ApplyVendorCreditSyncInvoicedSubscriber,
    ApplyVendorCreditSyncBillsSubscriber,
    DeleteCustomerLinkedCreditSubscriber,
    DeleteVendorAssociatedVendorCredit,

    // # Inventory
    InventoryCostGLBeforeWriteSubscriber,

    // #Invoices
    InvoicePaymentGLRewriteSubscriber,
    InvoiceCostGLEntriesSubscriber,
    InvoiceChangeStatusOnMailSentSubscriber,

    BillPaymentsGLEntriesRewriteSubscriber,

    // # Receipts
    SaleReceiptCostGLEntriesSubscriber,
    SaleReceiptMarkClosedOnMailSentSubcriber,

    // Transaction locking.
    SalesTransactionLockingGuardSubscriber,
    PurchasesTransactionLockingGuardSubscriber,
    FinancialTransactionLockingGuardSubscriber,
    CashflowWithAccountSubscriber,

    // Warehouses
    WarehousesItemsQuantitySyncSubscriber,
    WarehouseTransferInventoryTransactionsSubscriber,
    WarehouseTransferAutoIncrementSubscriber,
    ActivateWarehousesSubscriber,

    // Branches.
    AccountsTransactionsWarehousesSubscribe,
    ...BranchesIntegrationsSubscribers(),
    ...WarehousesIntegrationsSubscribers(),

    // Manual Journals
    ManualJournalWriteGLSubscriber,

    // Bills
    BillGLEntriesSubscriber,
    PaymentWriteGLEntriesSubscriber,

    SeedInitialCurrenciesOnSetupSubsriber,
    MutateBaseCurrencyAccountsSubscriber,

    // # Projects
    SyncActualTimeTaskSubscriber,
    ProjectBillableTasksSubscriber,
    ProjectBillableExpensesSubscriber,
    ProjectBillableBillSubscriber,

    // Tax Rates - Sale Invoice
    SaleInvoiceTaxRateValidateSubscriber,
    WriteInvoiceTaxTransactionsSubscriber,

    // Tax Rates - Bills
    BillTaxRateValidateSubscriber,
    WriteBillTaxTransactionsSubscriber,

    SyncItemTaxRateOnEditTaxSubscriber,

    // Plaid
    PlaidUpdateTransactionsOnItemCreatedSubscriber,

    // Cashflow
    DeleteCashflowTransactionOnUncategorize,
    PreventDeleteTransactionOnDelete,

    SubscribeFreeOnSignupCommunity,
    SendVerfiyMailOnSignUp,
  ];
};
