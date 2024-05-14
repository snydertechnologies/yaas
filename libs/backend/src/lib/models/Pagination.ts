import { ServiceError } from '@bigcapital/server/exceptions';
import { isEmpty } from 'lodash';
import { Model, QueryBuilder, RelationMappings, RelationType } from 'objection';

interface QueryAndThrowOptions {
  type?: string;
  message: string;
}

export class PaginationQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  pagination(page: number, pageSize: number) {
    return super.page(page, pageSize).runAfter(({ results, total }) => ({
      results,
      pagination: {
        total,
        page: page + 1,
        pageSize,
      },
    }));
  }

  queryAndThrowIfHasRelations(options: QueryAndThrowOptions) {
    const modelClass = this.modelClass();
    const relationMappings: RelationMappings = modelClass.relationMappings as RelationMappings;
    const modelRelations = Object.keys(relationMappings).filter((relation) => {
      const relType = relationMappings[relation]?.relation;
      return [Model.HasManyRelation, Model.HasOneRelation].includes(relType as RelationType);
    });

    const relations = modelClass.secureDeleteRelations || modelRelations;

    this.runAfter((models) => {
      const nonEmptyRelations = relations.filter((relation) => !isEmpty(models[relation]));
      if (nonEmptyRelations.length > 0) {
        throw new ServiceError(options.type || 'MODEL_HAS_RELATIONS', { message: options.message });
      }
      return models;
    });

    return this.onBuild((query) => {
      relations.forEach((relation) => {
        query.withGraphFetched(`${relation}(selectId)`).modifiers({
          selectId(builder) {
            builder.select('id');
          },
        });
      });
    });
  }
}
