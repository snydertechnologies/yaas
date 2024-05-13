import { PlaidApplication } from '@bigcapital/server/services/Banking/Plaid/PlaidApplication';
import { PlaidWebhookTenantBootMiddleware } from '@bigcapital/server/services/Banking/Plaid/PlaidWebhookTenantBootMiddleware';
import { LemonSqueezyWebhooks } from '@bigcapital/server/services/Subscription/LemonSqueezyWebhooks';
import { Router } from 'express';
import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import BaseController from '../BaseController';

@Service()
export class Webhooks extends BaseController {
  @Inject()
  private plaidApp: PlaidApplication;

  @Inject()
  private lemonWebhooksService: LemonSqueezyWebhooks;

  /**
   * Router constructor.
   */
  router() {
    const router = Router();

    router.use('/plaid', PlaidWebhookTenantBootMiddleware);
    router.post('/plaid', this.plaidWebhooks.bind(this));

    router.post('/lemon', this.lemonWebhooks.bind(this));

    return router;
  }

  /**
   * Listens to Lemon Squeezy webhooks events.
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  public async lemonWebhooks(req: Request, res: Response) {
    const data = req.body;
    const signature = req.headers['x-signature'] ?? '';
    const rawBody = req.rawBody;

    await this.lemonWebhooksService.handlePostWebhook(rawBody, data, signature);

    return res.status(200).send();
  }

  /**
   * Listens to Plaid webhooks.
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  public async plaidWebhooks(req: Request, res: Response) {
    const { tenantId } = req;
    const { webhook_type: webhookType, webhook_code: webhookCode, item_id: plaidItemId } = req.body;

    await this.plaidApp.webhooks(tenantId, plaidItemId, webhookType, webhookCode);
    return res.status(200).send({ code: 200, message: 'ok' });
  }
}
