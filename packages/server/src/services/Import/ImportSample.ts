import { Inject, Service } from 'typedi';
import { utils, write } from 'xlsx';
import { ImportableResources } from './ImportableResources';
import { sanitizeResourceName } from './_utils';

@Service()
export class ImportSampleService {
  @Inject()
  private importable: ImportableResources;

  /**
   * Retrieves the sample sheet of the given resource.
   * @param {number} tenantId
   * @param {string} resource
   * @param {string} format
   * @returns {Buffer | string}
   */
  public sample(tenantId: number, resource: string, format: 'csv' | 'xlsx'): Buffer | string {
    const _resource = sanitizeResourceName(resource);

    const ImportableRegistry = this.importable.registry;
    const importable = ImportableRegistry.getImportable(_resource);

    const data = importable.sampleData();

    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Determine the output format
    if (format === 'csv') {
      const csvOutput = utils.sheet_to_csv(worksheet);
      return csvOutput;
    } else {
      const xlsxOutput = write(workbook, {
        bookType: 'xlsx',
        type: 'buffer',
      });
      return xlsxOutput;
    }
  }
}
