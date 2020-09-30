import { Router, Request, Response, NextFunction } from 'express';
import {
  check,
  param,
  query,
} from 'express-validator';
import ItemCategoriesService from 'services/ItemCategories/ItemCategoriesService';
import { Inject, Service } from 'typedi';
import asyncMiddleware from 'api/middleware/asyncMiddleware';
import validateMiddleware from 'api/middleware/validateMiddleware';
import { IItemCategoryOTD } from 'interfaces';
import { ServiceError } from 'exceptions';
import BaseController from 'api/controllers/BaseController';

@Service()
export default class ItemsCategoriesController extends BaseController {
  @Inject()
  itemCategoriesService: ItemCategoriesService;

  /**
   * Router constructor method.
   */
  router() {
    const router = Router();

    router.post('/:id', [
        ...this.categoryValidationSchema,
        ...this.specificCategoryValidationSchema,
      ], 
      validateMiddleware,
      asyncMiddleware(this.editCategory.bind(this)),
      this.handlerServiceError,
    );
    router.post('/', [
        ...this.categoryValidationSchema,
      ],
      validateMiddleware,
      asyncMiddleware(this.newCategory.bind(this)),
      this.handlerServiceError,
    );
    router.delete('/', [
        ...this.categoriesBulkValidationSchema,
      ],
      validateMiddleware,
      asyncMiddleware(this.bulkDeleteCategories.bind(this)),
      this.handlerServiceError,
    );
    router.delete('/:id', [
        ...this.specificCategoryValidationSchema
      ],
      validateMiddleware,
      asyncMiddleware(this.deleteItem.bind(this)),
      this.handlerServiceError,
    );
    router.get('/:id', [
        ...this.specificCategoryValidationSchema,
      ],
      validateMiddleware,
      asyncMiddleware(this.getCategory.bind(this)),
      this.handlerServiceError,
    );
    router.get('/', [
        ...this.categoriesListValidationSchema
      ],
      validateMiddleware,
      asyncMiddleware(this.getList.bind(this)),
      this.handlerServiceError,
    );
    return router;
  }

  /**
   * Item category validation schema.
   */
  get categoryValidationSchema() {
    return [
      check('name').exists().trim().escape(),
      check('parent_category_id')
        .optional({ nullable: true, checkFalsy: true })
        .isNumeric()
        .toInt(),
      check('description')
        .optional()
        .trim()
        .escape(),
      check('sell_account_id')
        .optional({ nullable: true, checkFalsy: true })
        .isNumeric()
        .toInt(),
      check('cost_account_id')
        .optional()
        .isNumeric()
        .toInt(),
      check('inventory_account_id')
        .optional()
        .isNumeric()
        .toInt(),
    ]
  }

  /**
   * Validate items categories bulk actions.
   */
  get categoriesBulkValidationSchema() {
    return [
      query('ids').isArray({ min: 2 }),
      query('ids.*').isNumeric().toInt(),
    ];
  }

  /**
   * Validate items categories schema.
   */
  get categoriesListValidationSchema() {
    return [
      query('column_sort_order').optional().trim().escape(),
      query('sort_order').optional().trim().escape().isIn(['desc', 'asc']),
      query('stringified_filter_roles').optional().isJSON(),
    ];
  }

  /**
   * Validate specific item category schema.
   */
  get specificCategoryValidationSchema() {
    return [
      param('id').exists().toInt(),
    ];
  } 

  /**
   * Creates a new item category.
   * @param {Request} req 
   * @param {Response} res 
   */
  async newCategory(req: Request, res: Response, next: NextFunction) {
    const { user, tenantId } = req;
    const itemCategoryOTD: IItemCategoryOTD = this.matchedBodyData(req);

    try {
      const itemCategory = await this.itemCategoriesService.newItemCategory(tenantId, itemCategoryOTD, user);
      return res.status(200).send({ id: itemCategory.id });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Edit details of the given category item.
   * @param  {Request} req - 
   * @param  {Response} res - 
   * @return {Response}
   */
  async editCategory(req: Request, res: Response, next: NextFunction) {
    const { tenantId, user } = req;
    const { id: itemCategoryId } = req.params;
    const itemCategoryOTD: IItemCategoryOTD = this.matchedBodyData(req);

    try {
      await this.itemCategoriesService.editItemCategory(tenantId, itemCategoryId, itemCategoryOTD, user);
      return res.status(200).send({ id: itemCategoryId });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete the give item category.
   * @param  {Request} req - 
   * @param  {Response} res - 
   * @return {Response}
   */
  async deleteItem(req: Request, res: Response, next: NextFunction) {
    const { id: itemCategoryId } = req.params;
    const { tenantId, user } = req;

    try {
      await this.itemCategoriesService.deleteItemCategory(tenantId, itemCategoryId, user);
      return res.status(200).send({ id: itemCategoryId });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve the list of items.
   * @param  {Request} req - 
   * @param  {Response} res - 
   * @return {Response}
   */
  async getList(req: Request, res: Response, next: NextFunction) {
    const { tenantId, user } = req;
    const itemCategoriesFilter = this.matchedQueryData(req);

    try {
      const itemCategories = await this.itemCategoriesService.getItemCategoriesList(
        tenantId, itemCategoriesFilter, user,
      );
      return res.status(200).send({ item_categories: itemCategories });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve details of the given category.
   * @param  {Request} req - 
   * @param  {Response} res - 
   * @return {Response}
   */
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const itemCategoryId: number = req.params.id;
    const { tenantId, user } = req;

    try {
      const itemCategory = await this.itemCategoriesService.getItemCategory(tenantId, itemCategoryId, user);
      return res.status(200).send({ category: itemCategory });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Bulk delete the given item categories.
   * @param  {Request} req - 
   * @param  {Response} res - 
   * @return {Response}
   */
  async bulkDeleteCategories(req: Request, res: Response, next: NextFunction) {
    const itemCategoriesIds = req.query.ids;
    const { tenantId, user } = req;

    try {
      await this.itemCategoriesService.deleteItemCategories(tenantId, itemCategoriesIds, user);
      return res.status(200).send({ ids: itemCategoriesIds });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles service error.
   * @param {Error} error 
   * @param {Request} req - 
   * @param {Response} res - 
   * @param {NextFunction} next 
   */
  handlerServiceError(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ServiceError) {
      if (error.errorType === 'CATEGORY_NOT_FOUND') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'ITEM_CATEGORY_NOT_FOUND', code: 100 }],
        });
      }
      if (error.errorType === 'ITEM_CATEGORIES_NOT_FOUND') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'ITEM_CATEGORIES_NOT_FOUND', code: 120 }],
        });
      }
      if (error.errorType === 'COST_ACCOUNT_NOT_FOUMD') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'COST.ACCOUNT.NOT.FOUND', code: 120 }],
        });
      }
      if (error.errorType === 'COST_ACCOUNT_NOT_COGS') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'COST.ACCOUNT.NOT.COGS.TYPE', code: 220 }],
        });
      }
      if (error.errorType === 'SELL_ACCOUNT_NOT_INCOME') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'SELL.ACCOUNT.NOT.FOUND', code: 130 }],
        });
      }
      if (error.errorType === 'SELL_ACCOUNT_NOT_FOUND') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'SELL.ACCOUNT.NOT.INCOME.TYPE', code: 230 }],
        });
      }
      if (error.errorType === 'INVENTORY_ACCOUNT_NOT_FOUND') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'INVENTORY.ACCOUNT.NOT.FOUND', code: 200}],
        });
      }
      if (error.errorType === 'INVENTORY_ACCOUNT_NOT_INVENTORY') {
        return res.boom.badRequest(null, {
          errors: [{ type: 'INVENTORY.ACCOUNT.NOT.CURRENT.ASSET', code: 300 }],
        });
      }
    }
    next(error);
  }
};