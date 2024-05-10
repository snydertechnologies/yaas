import { SendVerifyMailJob } from '@/services/Authentication/jobs/SendVerifyMailJob';
import { PlaidFetchTransactionsJob } from '@/services/Banking/Plaid/PlaidFetchTransactionsJob';
import { ImportDeleteExpiredFilesJobs } from '@/services/Import/jobs/ImportDeleteExpiredFilesJob';
import { SendSaleEstimateMailJob } from '@/services/Sales/Estimates/SendSaleEstimateMailJob';
import { SendSaleInvoiceMailJob } from '@/services/Sales/Invoices/SendSaleInvoiceMailJob';
import { SendSaleInvoiceReminderMailJob } from '@/services/Sales/Invoices/SendSaleInvoiceMailReminderJob';
import { PaymentReceiveMailNotificationJob } from '@/services/Sales/PaymentReceives/PaymentReceiveMailNotificationJob';
import { SaleReceiptMailNotificationJob } from '@/services/Sales/Receipts/SaleReceiptMailNotificationJob';
import type Agenda from 'agenda';
import ComputeItemCost from 'jobs/ComputeItemCost';
import OrganizationSetupJob from 'jobs/OrganizationSetup';
import OrganizationUpgrade from 'jobs/OrganizationUpgrade';
import ResetPasswordMailJob from 'jobs/ResetPasswordMail';
import UserInviteMailJob from 'jobs/UserInviteMail';
import RewriteInvoicesJournalEntries from 'jobs/WriteInvoicesJEntries';

export default ({ agenda }: { agenda: Agenda }) => {
  new ResetPasswordMailJob(agenda);
  new UserInviteMailJob(agenda);
  new ComputeItemCost(agenda);
  new RewriteInvoicesJournalEntries(agenda);
  new OrganizationSetupJob(agenda);
  new OrganizationUpgrade(agenda);
  new SendSaleInvoiceMailJob(agenda);
  new SendSaleInvoiceReminderMailJob(agenda);
  new SendSaleEstimateMailJob(agenda);
  new SaleReceiptMailNotificationJob(agenda);
  new PaymentReceiveMailNotificationJob(agenda);
  new PlaidFetchTransactionsJob(agenda);
  new ImportDeleteExpiredFilesJobs(agenda);
  new SendVerifyMailJob(agenda);

  agenda.start().then(() => {
    agenda.every('1 hours', 'delete-expired-imported-files', {});
  });
};
