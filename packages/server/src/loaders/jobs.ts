import ComputeItemCost from '@bigcapital/server/jobs/ComputeItemCost';
import OrganizationSetupJob from '@bigcapital/server/jobs/OrganizationSetup';
import OrganizationUpgrade from '@bigcapital/server/jobs/OrganizationUpgrade';
import ResetPasswordMailJob from '@bigcapital/server/jobs/ResetPasswordMail';
import UserInviteMailJob from '@bigcapital/server/jobs/UserInviteMail';
import RewriteInvoicesJournalEntries from '@bigcapital/server/jobs/WriteInvoicesJEntries';
import { SendVerifyMailJob } from '@bigcapital/server/services/Authentication/jobs/SendVerifyMailJob';
import { PlaidFetchTransactionsJob } from '@bigcapital/server/services/Banking/Plaid/PlaidFetchTransactionsJob';
import { ImportDeleteExpiredFilesJobs } from '@bigcapital/server/services/Import/jobs/ImportDeleteExpiredFilesJob';
import { SendSaleEstimateMailJob } from '@bigcapital/server/services/Sales/Estimates/SendSaleEstimateMailJob';
import { SendSaleInvoiceMailJob } from '@bigcapital/server/services/Sales/Invoices/SendSaleInvoiceMailJob';
import { SendSaleInvoiceReminderMailJob } from '@bigcapital/server/services/Sales/Invoices/SendSaleInvoiceMailReminderJob';
import { PaymentReceiveMailNotificationJob } from '@bigcapital/server/services/Sales/PaymentReceives/PaymentReceiveMailNotificationJob';
import { SaleReceiptMailNotificationJob } from '@bigcapital/server/services/Sales/Receipts/SaleReceiptMailNotificationJob';
import type Agenda from 'agenda';

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
