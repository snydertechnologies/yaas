import AccountDrawer from '@bigcapital/webapp/containers/Drawers/AccountDrawer';
import BillDrawer from '@bigcapital/webapp/containers/Drawers/BillDrawer';
import CashflowTransactionDetailDrawer from '@bigcapital/webapp/containers/Drawers/CashflowTransactionDetailDrawer';
import CreditNoteDetailDrawer from '@bigcapital/webapp/containers/Drawers/CreditNoteDetailDrawer';
import CustomerDetailsDrawer from '@bigcapital/webapp/containers/Drawers/CustomerDetailsDrawer';
import EstimateDetailDrawer from '@bigcapital/webapp/containers/Drawers/EstimateDetailDrawer';
import ExpenseDrawer from '@bigcapital/webapp/containers/Drawers/ExpenseDrawer';
import InventoryAdjustmentDetailDrawer from '@bigcapital/webapp/containers/Drawers/InventoryAdjustmentDetailDrawer';
import InvoiceDetailDrawer from '@bigcapital/webapp/containers/Drawers/InvoiceDetailDrawer';
import ItemDetailDrawer from '@bigcapital/webapp/containers/Drawers/ItemDetailDrawer';
import ManualJournalDrawer from '@bigcapital/webapp/containers/Drawers/ManualJournalDrawer';
import PaymentMadeDetailDrawer from '@bigcapital/webapp/containers/Drawers/PaymentMadeDetailDrawer';
import PaymentReceiveDetailDrawer from '@bigcapital/webapp/containers/Drawers/PaymentReceiveDetailDrawer';
import QuickCreateCustomerDrawer from '@bigcapital/webapp/containers/Drawers/QuickCreateCustomerDrawer';
import QuickCreateItemDrawer from '@bigcapital/webapp/containers/Drawers/QuickCreateItemDrawer';
import QuickWriteVendorDrawer from '@bigcapital/webapp/containers/Drawers/QuickWriteVendorDrawer';
import ReceiptDetailDrawer from '@bigcapital/webapp/containers/Drawers/ReceiptDetailDrawer';
import RefundCreditNoteDetailDrawer from '@bigcapital/webapp/containers/Drawers/RefundCreditNoteDetailDrawer';
import RefundVendorCreditDetailDrawer from '@bigcapital/webapp/containers/Drawers/RefundVendorCreditDetailDrawer';
import VendorCreditDetailDrawer from '@bigcapital/webapp/containers/Drawers/VendorCreditDetailDrawer';
import VendorDetailsDrawer from '@bigcapital/webapp/containers/Drawers/VendorDetailsDrawer';
import WarehouseTransferDetailDrawer from '@bigcapital/webapp/containers/Drawers/WarehouseTransferDetailDrawer';
import TaxRateDetailsDrawer from '@bigcapital/webapp/containers/TaxRates/drawers/TaxRateDetailsDrawer/TaxRateDetailsDrawer';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import CategorizeTransactionDrawer from '@bigcapital/webapp/containers/CashFlow/CategorizeTransaction/drawers/CategorizeTransactionDrawer/CategorizeTransactionDrawer';

/**
 * Drawers container of the dashboard.
 */
export default function DrawersContainer() {
  return (
    <div>
      <AccountDrawer name={DRAWERS.ACCOUNT_DETAILS} />
      <ManualJournalDrawer name={DRAWERS.JOURNAL_DETAILS} />
      <ExpenseDrawer name={DRAWERS.EXPENSE_DETAILS} />
      <BillDrawer name={DRAWERS.BILL_DETAILS} />
      <InvoiceDetailDrawer name={DRAWERS.INVOICE_DETAILS} />
      <EstimateDetailDrawer name={DRAWERS.ESTIMATE_DETAILS} />
      <ReceiptDetailDrawer name={DRAWERS.RECEIPT_DETAILS} />
      <PaymentReceiveDetailDrawer name={DRAWERS.PAYMENT_RECEIVE_DETAILS} />
      <PaymentMadeDetailDrawer name={DRAWERS.PAYMENT_MADE_DETAILS} />
      <ItemDetailDrawer name={DRAWERS.ITEM_DETAILS} />
      <CustomerDetailsDrawer name={DRAWERS.CUSTOMER_DETAILS} />
      <VendorDetailsDrawer name={DRAWERS.VENDOR_DETAILS} />
      <InventoryAdjustmentDetailDrawer name={DRAWERS.INVENTORY_ADJUSTMENT_DETAILS} />
      <CashflowTransactionDetailDrawer name={DRAWERS.CASHFLOW_TRNASACTION_DETAILS} />
      <QuickCreateCustomerDrawer name={DRAWERS.QUICK_CREATE_CUSTOMER} />
      <QuickCreateItemDrawer name={DRAWERS.QUICK_CREATE_ITEM} />
      <QuickWriteVendorDrawer name={DRAWERS.QUICK_WRITE_VENDOR} />
      <CreditNoteDetailDrawer name={DRAWERS.CREDIT_NOTE_DETAILS} />
      <VendorCreditDetailDrawer name={DRAWERS.VENDOR_CREDIT_DETAILS} />
      <RefundCreditNoteDetailDrawer name={DRAWERS.REFUND_CREDIT_NOTE_DETAILS} />
      <RefundVendorCreditDetailDrawer name={DRAWERS.REFUND_VENDOR_CREDIT_DETAILS} />
      <WarehouseTransferDetailDrawer name={DRAWERS.WAREHOUSE_TRANSFER_DETAILS} />
      <TaxRateDetailsDrawer name={DRAWERS.TAX_RATE_DETAILS} />
      <CategorizeTransactionDrawer name={DRAWERS.CATEGORIZE_TRANSACTION} />
    </div>
  );
}
