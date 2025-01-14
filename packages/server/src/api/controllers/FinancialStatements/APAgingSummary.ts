import { AbilitySubject, ReportsAction } from '@bigcapital/libs-backend';
import { ACCEPT_TYPE } from '@bigcapital/libs-backend';
import CheckPolicies from '@bigcapital/server/api/middleware/CheckPolicies';
import asyncMiddleware from '@bigcapital/server/api/middleware/asyncMiddleware';
import { APAgingSummaryApplication } from '@bigcapital/server/services/FinancialStatements/AgingSummary/APAgingSummaryApplication';
import { NextFunction, Request, Response, Router } from 'express';
import { query } from 'express-validator';
import { Inject } from 'typedi';
import BaseFinancialReportController from './BaseFinancialReportController';

export default class APAgingSummaryReportController extends BaseFinancialReportController {
  @Inject()
  private APAgingSummaryApp: APAgingSummaryApplication;

  /**
   * Router constructor.
   */
  public router() {
    const router = Router();

    router.get(
      '/',
      CheckPolicies(ReportsAction.READ_AP_AGING_SUMMARY, AbilitySubject.Report),
      this.validationSchema,
      asyncMiddleware(this.payableAgingSummary.bind(this)),
    );
    return router;
  }

  /**
   * Validation schema.
   * @returns {ValidationChain[]}
   */
  private get validationSchema() {
    return [
      ...this.sheetNumberFormatValidationSchema,
      query('as_date').optional().isISO8601(),

      query('aging_days_before').default(30).isInt({ max: 500 }).toInt(),
      query('aging_periods').default(3).isInt({ max: 12 }).toInt(),

      query('vendors_ids').optional().isArray({ min: 1 }),
      query('vendors_ids.*').isInt({ min: 1 }).toInt(),

      query('none_zero').default(true).isBoolean().toBoolean(),

      // Filtering by branches.
      query('branches_ids')
        .optional()
        .toArray()
        .isArray({ min: 1 }),
      query('branches_ids.*').isNumeric().toInt(),
    ];
  }

  /**
   * Retrieves payable aging summary report.
   * @param {Request} req -
   * @param {Response} res -
   * @param {NextFunction} next -
   */
  private async payableAgingSummary(req: Request, res: Response, next: NextFunction) {
    const { tenantId } = req;
    const filter = this.matchedQueryData(req);

    try {
      const accept = this.accepts(req);
      const acceptType = accept.types([
        ACCEPT_TYPE.APPLICATION_JSON,
        ACCEPT_TYPE.APPLICATION_JSON_TABLE,
        ACCEPT_TYPE.APPLICATION_CSV,
        ACCEPT_TYPE.APPLICATION_XLSX,
        ACCEPT_TYPE.APPLICATION_PDF,
      ]);
      // Retrieves the json table format.
      if (ACCEPT_TYPE.APPLICATION_JSON_TABLE === acceptType) {
        const table = await this.APAgingSummaryApp.table(tenantId, filter);

        return res.status(200).send(table);
        // Retrieves the csv format.
      } else if (ACCEPT_TYPE.APPLICATION_CSV === acceptType) {
        const csv = await this.APAgingSummaryApp.csv(tenantId, filter);

        res.setHeader('Content-Disposition', 'attachment; filename=output.csv');
        res.setHeader('Content-Type', 'text/csv');

        return res.send(csv);
        // Retrieves the xlsx format.
      } else if (ACCEPT_TYPE.APPLICATION_XLSX === acceptType) {
        const buffer = await this.APAgingSummaryApp.xlsx(tenantId, filter);

        res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buffer);
        // Retrieves the pdf format.
      } else if (ACCEPT_TYPE.APPLICATION_PDF === acceptType) {
        const pdfContent = await this.APAgingSummaryApp.pdf(tenantId, filter);

        res.set({
          'Content-Type': 'application/pdf',
          'Content-Length': pdfContent.length,
        });
        return res.send(pdfContent);
        // Retrieves the json format.
      } else {
        const sheet = await this.APAgingSummaryApp.sheet(tenantId, filter);

        return res.status(200).send(sheet);
      }
    } catch (error) {
      next(error);
    }
  }
}
