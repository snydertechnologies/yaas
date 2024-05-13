import { IVendorCreditCreatedPayload } from '@bigcapital/server/interfaces';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import BaseVendorCredit from './BaseVendorCredit';

@Service()
export default class VendorCreditAutoSerialSubscriber {
  @Inject()
  vendorCreditService: BaseVendorCredit;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.vendorCredit.onCreated, this.autoIncrementOnceCreated);
  }

  /**
   * Auto serial increment once the vendor credit created.
   * @param {IVendorCreditCreatedPayload} payload
   */
  private autoIncrementOnceCreated = ({ tenantId }: IVendorCreditCreatedPayload) => {
    this.vendorCreditService.incrementSerialNumber(tenantId);
  };
}
