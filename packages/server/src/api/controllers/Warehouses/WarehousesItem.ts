import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator';
import { Inject, Service } from 'typedi';

import { Features } from '@bigcapital/libs-backend';
import BaseController from '@bigcapital/server/api/controllers/BaseController';
import { FeatureActivationGuard } from '@bigcapital/server/api/middleware/FeatureActivationGuard';
import { WarehousesApplication } from '@bigcapital/server/services/Warehouses/WarehousesApplication';

@Service()
export class WarehousesItemController extends BaseController {
  @Inject()
  warehousesApplication: WarehousesApplication;

  router() {
    const router = Router();

    router.get(
      '/items/:id/warehouses',
      FeatureActivationGuard(Features.WAREHOUSES),
      [param('id').exists().isInt().toInt()],
      this.validationResult,
      this.getItemWarehouses,
    );
    return router;
  }

  getItemWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { id: warehouseId } = req.params;

    try {
      const itemWarehouses = await this.warehousesApplication.getItemWarehouses(tenantId, warehouseId);

      return res.status(200).send({ itemWarehouses });
    } catch (error) {
      next(error);
    }
  };
}
