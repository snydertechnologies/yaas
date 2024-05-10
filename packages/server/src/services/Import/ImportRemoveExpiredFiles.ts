import { Import } from '@/system/models';
import bluebird from 'bluebird';
import moment from 'moment';
import { Service } from 'typedi';
import { deleteImportFile } from './_utils';

@Service()
export class ImportDeleteExpiredFiles {
  /**
   * Delete expired files.
   */
  async deleteExpiredFiles() {
    const yesterday = moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm');

    const expiredImports = await Import.query().where('createdAt', '<', yesterday);
    await bluebird.map(
      expiredImports,
      async (expiredImport) => {
        await deleteImportFile(expiredImport.filename);
      },
      { concurrency: 10 },
    );
    const expiredImportsIds = expiredImports.map((expiredImport) => expiredImport.id);
    if (expiredImportsIds.length > 0) {
      await Import.query().whereIn('id', expiredImportsIds).delete();
    }
  }
}
