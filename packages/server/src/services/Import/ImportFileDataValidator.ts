import { IModelMeta } from '@bigcapital/libs-backend';
import { ServiceError } from '@bigcapital/server/exceptions';
import { Service } from 'typedi';
import { ERRORS, convertFieldsToYupValidation } from './_utils';
import { ImportInsertError, ResourceMetaFieldsMap } from './interfaces';

@Service()
export class ImportFileDataValidator {
  /**
   * Validates the given resource is importable.
   * @param {IModelMeta} resourceMeta
   */
  public validateResourceImportable(resourceMeta: IModelMeta) {
    // Throw service error if the resource does not support importing.
    if (!resourceMeta.importable) {
      throw new ServiceError(ERRORS.RESOURCE_NOT_IMPORTABLE);
    }
  }

  /**
   * Validates the given mapped DTOs and returns errors with their index.
   * @param {Record<string, any>} mappedDTOs
   * @returns {Promise<void | ImportInsertError[]>}
   */
  public async validateData(
    importableFields: ResourceMetaFieldsMap,
    data: Record<string, any>,
  ): Promise<void | ImportInsertError[]> {
    const YupSchema = convertFieldsToYupValidation(importableFields);
    const _data = { ...data };

    try {
      await YupSchema.validate(_data, { abortEarly: false });
    } catch (validationError) {
      const errors = validationError.inner.reduce((errors, error) => {
        const newErrors = error.errors.map((errMsg) => ({
          errorCode: 'ValidationError',
          errorMessage: errMsg,
        }));
        return [...errors, ...newErrors];
      }, []);

      throw errors;
    }
  }
}
