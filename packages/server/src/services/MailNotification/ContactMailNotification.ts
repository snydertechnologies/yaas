import { CommonMailOptions } from '@bigcapital/libs-backend';
import { MailTenancy } from '@bigcapital/server/services/MailTenancy/MailTenancy';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Tenant } from '@bigcapital/server/system/models';
import { formatSmsMessage } from '@bigcapital/server/utils';
import { Inject, Service } from 'typedi';

@Service()
export class ContactMailNotification {
  @Inject()
  private mailTenancy: MailTenancy;

  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Parses the default message options.
   * @param {number} tenantId -
   * @param {number} invoiceId -
   * @param {string} subject -
   * @param {string} body -
   * @returns {Promise<SaleInvoiceMailOptions>}
   */
  public async getDefaultMailOptions(
    tenantId: number,
    contactId: number,
    subject: string = '',
    body: string = '',
  ): Promise<CommonMailOptions> {
    const { Customer } = this.tenancy.models(tenantId);
    const contact = await Customer.query().findById(contactId).throwIfNotFound();

    const toAddresses = contact.contactAddresses;
    const fromAddresses = await this.mailTenancy.senders(tenantId);

    const toAddress = toAddresses.find((a) => a.primary);
    const fromAddress = fromAddresses.find((a) => a.primary);

    const to = toAddress?.mail || '';
    const from = fromAddress?.mail || '';

    return {
      subject,
      body,
      to,
      from,
      fromAddresses,
      toAddresses,
    };
  }

  /**
   * Retrieves the mail options of the given contact.
   * @param {number} tenantId - Tenant id.
   * @param {number} invoiceId - Invoice id.
   * @param {string} defaultSubject - Default subject text.
   * @param {string} defaultBody - Default body text.
   * @returns {Promise<CommonMailOptions>}
   */
  public async getMailOptions(
    tenantId: number,
    contactId: number,
    defaultSubject?: string,
    defaultBody?: string,
    formatterData?: Record<string, any>,
  ): Promise<CommonMailOptions> {
    const mailOpts = await this.getDefaultMailOptions(tenantId, contactId, defaultSubject, defaultBody);
    const commonFormatArgs = await this.getCommonFormatArgs(tenantId);
    const formatArgs = {
      ...commonFormatArgs,
      ...formatterData,
    };
    const subject = formatSmsMessage(mailOpts.subject, formatArgs);
    const body = formatSmsMessage(mailOpts.body, formatArgs);

    return {
      ...mailOpts,
      subject,
      body,
    };
  }

  /**
   * Retrieves the common format args.
   * @param {number} tenantId
   * @returns {Promise<Record<string, string>>}
   */
  public async getCommonFormatArgs(tenantId: number): Promise<Record<string, string>> {
    const organization = await Tenant.query().findById(tenantId).withGraphFetched('metadata');

    return {
      CompanyName: organization.metadata.name,
    };
  }
}
