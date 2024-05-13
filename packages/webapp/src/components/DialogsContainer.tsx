import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { ConnectBankDialog } from '@bigcapital/webapp/containers/CashFlow/ConnectBankDialog';
import MoneyInDialog from '@bigcapital/webapp/containers/CashFlow/MoneyInDialog';
import MoneyOutDialog from '@bigcapital/webapp/containers/CashFlow/MoneyOutDialog';
import AccountDialog from '@bigcapital/webapp/containers/Dialogs/AccountDialog';
import AllocateLandedCostDialog from '@bigcapital/webapp/containers/Dialogs/AllocateLandedCostDialog';
import BadDebtDialog from '@bigcapital/webapp/containers/Dialogs/BadDebtDialog';
import BranchActivateDialog from '@bigcapital/webapp/containers/Dialogs/BranchActivateDialog';
import BranchFormDialog from '@bigcapital/webapp/containers/Dialogs/BranchFormDialog';
import ContactDuplicateDialog from '@bigcapital/webapp/containers/Dialogs/ContactDuplicateDialog';
import CreditNotePdfPreviewDialog from '@bigcapital/webapp/containers/Dialogs/CreditNotePdfPreviewDialog';
import CurrencyFormDialog from '@bigcapital/webapp/containers/Dialogs/CurrencyFormDialog';
import CustomerOpeningBalanceDialog from '@bigcapital/webapp/containers/Dialogs/CustomerOpeningBalanceDialog';
import EstimatePdfPreviewDialog from '@bigcapital/webapp/containers/Dialogs/EstimatePdfPreviewDialog';
import { ExportDialog } from '@bigcapital/webapp/containers/Dialogs/ExportDialog';
import InventoryAdjustmentDialog from '@bigcapital/webapp/containers/Dialogs/InventoryAdjustmentFormDialog';
import InviteUserDialog from '@bigcapital/webapp/containers/Dialogs/InviteUserDialog';
import InvoicePdfPreviewDialog from '@bigcapital/webapp/containers/Dialogs/InvoicePdfPreviewDialog';
import ItemCategoryDialog from '@bigcapital/webapp/containers/Dialogs/ItemCategoryDialog';
import LockingTransactionsDialog from '@bigcapital/webapp/containers/Dialogs/LockingTransactionsDialog';
import NotifyEstimateViaSMSDialog from '@bigcapital/webapp/containers/Dialogs/NotifyEstimateViaSMSDialog';
import NotifyInvoiceViaSMSDialog from '@bigcapital/webapp/containers/Dialogs/NotifyInvoiceViaSMSDialog';
import NotifyPaymentReceiveViaSMSDialog from '@bigcapital/webapp/containers/Dialogs/NotifyPaymentReceiveViaSMSDialog';
import NotifyReceiptViaSMSDialog from '@bigcapital/webapp/containers/Dialogs/NotifyReceiptViaSMSDialog';
import PaymentReceivePdfPreviewDialog from '@bigcapital/webapp/containers/Dialogs/PaymentReceivePdfPreviewDialog';
import PaymentViaVoucherDialog from '@bigcapital/webapp/containers/Dialogs/PaymentViaVoucherDialog';
import QuickPaymentMadeFormDialog from '@bigcapital/webapp/containers/Dialogs/QuickPaymentMadeFormDialog';
import QuickPaymentReceiveFormDialog from '@bigcapital/webapp/containers/Dialogs/QuickPaymentReceiveFormDialog';
import ReceiptPdfPreviewDialog from '@bigcapital/webapp/containers/Dialogs/ReceiptPdfPreviewDialog';
import ReconcileCreditNoteDialog from '@bigcapital/webapp/containers/Dialogs/ReconcileCreditNoteDialog';
import ReconcileVendorCreditDialog from '@bigcapital/webapp/containers/Dialogs/ReconcileVendorCreditDialog';
import RefundCreditNoteDialog from '@bigcapital/webapp/containers/Dialogs/RefundCreditNoteDialog';
import RefundVendorCreditDialog from '@bigcapital/webapp/containers/Dialogs/RefundVendorCreditDialog';
import SMSMessageDialog from '@bigcapital/webapp/containers/Dialogs/SMSMessageDialog';
import UnlockingPartialTransactionsDialog from '@bigcapital/webapp/containers/Dialogs/UnlockingPartialTransactionsDialog';
import UnlockingTransactionsDialog from '@bigcapital/webapp/containers/Dialogs/UnlockingTransactionsDialog';
import UserFormDialog from '@bigcapital/webapp/containers/Dialogs/UserFormDialog';
import VendorOpeningBalanceDialog from '@bigcapital/webapp/containers/Dialogs/VendorOpeningBalanceDialog';
import WarehouseActivateDialog from '@bigcapital/webapp/containers/Dialogs/WarehouseActivateDialog';
import WarehouseFormDialog from '@bigcapital/webapp/containers/Dialogs/WarehouseFormDialog';
import KeyboardShortcutsDialog from '@bigcapital/webapp/containers/Dialogs/keyboardShortcutsDialog';
import EstimatedExpenseFormDialog from '@bigcapital/webapp/containers/Projects/containers/EstimatedExpenseFormDialog';
import ProjectBillableEntriesFormDialog from '@bigcapital/webapp/containers/Projects/containers/ProjectBillableEntriesFormDialog';
import ProjectExpenseForm from '@bigcapital/webapp/containers/Projects/containers/ProjectExpenseForm';
import ProjectFormDialog from '@bigcapital/webapp/containers/Projects/containers/ProjectFormDialog';
import ProjectInvoicingFormDialog from '@bigcapital/webapp/containers/Projects/containers/ProjectInvoicingFormDialog';
import ProjectTaskFormDialog from '@bigcapital/webapp/containers/Projects/containers/ProjectTaskFormDialog';
import ProjectTimeEntryFormDialog from '@bigcapital/webapp/containers/Projects/containers/ProjectTimeEntryFormDialog';
import EstimateMailDialog from '@bigcapital/webapp/containers/Sales/Estimates/EstimateMailDialog/EstimateMailDialog';
import InvoiceExchangeRateChangeDialog from '@bigcapital/webapp/containers/Sales/Invoices/InvoiceForm/Dialogs/InvoiceExchangeRateChangeDialog';
import InvoiceMailDialog from '@bigcapital/webapp/containers/Sales/Invoices/InvoiceMailDialog/InvoiceMailDialog';
import PaymentMailDialog from '@bigcapital/webapp/containers/Sales/PaymentReceives/PaymentMailDialog/PaymentMailDialog';
import ReceiptMailDialog from '@bigcapital/webapp/containers/Sales/Receipts/ReceiptMailDialog/ReceiptMailDialog';
import TaxRateFormDialog from '@bigcapital/webapp/containers/TaxRates/dialogs/TaxRateFormDialog/TaxRateFormDialog';

/**
 * Dialogs container.
 */
export default function DialogsContainer() {
  return (
    <div>
      <AccountDialog dialogName={DialogsName.AccountForm} />
      <CurrencyFormDialog dialogName={DialogsName.CurrencyForm} />
      <InviteUserDialog dialogName={DialogsName.InviteForm} />
      <UserFormDialog dialogName={DialogsName.UserForm} />
      <ItemCategoryDialog dialogName={DialogsName.ItemCategoryForm} />
      <InventoryAdjustmentDialog dialogName={DialogsName.InventoryAdjustmentForm} />
      <PaymentViaVoucherDialog dialogName={DialogsName.PaymentViaVoucherForm} />
      <KeyboardShortcutsDialog dialogName={DialogsName.KeyboardShortcutForm} />
      <ContactDuplicateDialog dialogName={DialogsName.ContactDuplicateForm} />
      <QuickPaymentReceiveFormDialog dialogName={DialogsName.QuickPaymentReceiveForm} />
      <QuickPaymentMadeFormDialog dialogName={DialogsName.QuickPaymentMadeForm} />
      <AllocateLandedCostDialog dialogName={DialogsName.AllocateLandedCostForm} />
      <InvoicePdfPreviewDialog dialogName={DialogsName.InvoicePdfForm} />
      <EstimatePdfPreviewDialog dialogName={DialogsName.EstimatePdfForm} />
      <ReceiptPdfPreviewDialog dialogName={DialogsName.ReceiptPdfForm} />
      <MoneyInDialog dialogName={DialogsName.MoneyInForm} />
      <MoneyOutDialog dialogName={DialogsName.MoneyOutForm} />

      <NotifyInvoiceViaSMSDialog dialogName={DialogsName.NotifyInvoiceViaForm} />
      <NotifyReceiptViaSMSDialog dialogName={DialogsName.NotifyReceiptViaForm} />
      <NotifyEstimateViaSMSDialog dialogName={DialogsName.NotifyEstimateViaForm} />
      <NotifyPaymentReceiveViaSMSDialog dialogName={DialogsName.NotifyPaymentViaForm} />

      <BadDebtDialog dialogName={DialogsName.BadDebtForm} />
      <SMSMessageDialog dialogName={DialogsName.SMSMessageForm} />
      <RefundCreditNoteDialog dialogName={DialogsName.RefundCreditNote} />
      <RefundVendorCreditDialog dialogName={DialogsName.RefundVendorCredit} />
      <ReconcileCreditNoteDialog dialogName={DialogsName.ReconcileCreditNote} />
      <ReconcileVendorCreditDialog dialogName={DialogsName.ReconcileVendorCredit} />
      <LockingTransactionsDialog dialogName={DialogsName.TransactionsLocking} />
      <UnlockingTransactionsDialog dialogName={DialogsName.TransactionsUnlocking} />
      <UnlockingPartialTransactionsDialog dialogName={DialogsName.PartialTransactionsUnlocking} />
      <CreditNotePdfPreviewDialog dialogName={DialogsName.CreditNotePdfForm} />
      <PaymentReceivePdfPreviewDialog dialogName={DialogsName.PaymentPdfForm} />
      <WarehouseFormDialog dialogName={DialogsName.WarehouseForm} />
      <BranchFormDialog dialogName={DialogsName.BranchForm} />
      <BranchActivateDialog dialogName={DialogsName.BranchActivateForm} />
      <WarehouseActivateDialog dialogName={DialogsName.WarehouseActivateForm} />
      <CustomerOpeningBalanceDialog dialogName={DialogsName.CustomerOpeningBalanceForm} />
      <VendorOpeningBalanceDialog dialogName={DialogsName.VendorOpeningBalanceForm} />
      <ProjectFormDialog dialogName={DialogsName.ProjectForm} />
      <ProjectTaskFormDialog dialogName={DialogsName.ProjectTaskForm} />
      <ProjectTimeEntryFormDialog dialogName={DialogsName.ProjectTimeEntryForm} />
      <ProjectExpenseForm dialogName={DialogsName.ProjectExpenseForm} />
      <EstimatedExpenseFormDialog dialogName={DialogsName.EstimateExpenseForm} />
      <ProjectInvoicingFormDialog dialogName={DialogsName.ProjectInvoicingForm} />
      <ProjectBillableEntriesFormDialog dialogName={DialogsName.ProjectBillableEntriesForm} />
      <TaxRateFormDialog dialogName={DialogsName.TaxRateForm} />
      <InvoiceExchangeRateChangeDialog dialogName={DialogsName.InvoiceExchangeRateChangeNotice} />
      <InvoiceMailDialog dialogName={DialogsName.InvoiceMail} />
      <EstimateMailDialog dialogName={DialogsName.EstimateMail} />
      <ReceiptMailDialog dialogName={DialogsName.ReceiptMail} />
      <PaymentMailDialog dialogName={DialogsName.PaymentMail} />
      <ConnectBankDialog dialogName={DialogsName.ConnectBankCreditCard} />

      <ExportDialog dialogName={DialogsName.Export} />
    </div>
  );
}
