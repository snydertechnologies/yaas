import { SystemUser } from '@bigcapital/server/system/models';
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { Service } from 'typedi';
import { configureLemonSqueezy } from './utils';

@Service()
export class LemonSqueezyService {
  /**
   * Retrieves the LemonSqueezy checkout url.
   * @param {number} variantId
   * @param {SystemUser} user
   */
  async getCheckout(variantId: number, user: SystemUser) {
    configureLemonSqueezy();

    return createCheckout(process.env.LEMONSQUEEZY_STORE_ID!, variantId, {
      checkoutOptions: {
        embed: true,
        media: true,
        logo: true,
      },
      checkoutData: {
        email: user.email,
        custom: {
          user_id: user.id + '',
          tenant_id: user.tenantId + '',
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `http://localhost:4000/dashboard/billing/`,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
      },
    });
  }
}
