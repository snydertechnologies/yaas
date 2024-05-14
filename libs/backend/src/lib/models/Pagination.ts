import { ServiceError } from '@bigcapital/server/exceptions';
import { isEmpty } from 'lodash';
import { Model, Page, QueryBuilder, RelationMappings, RelationType } from 'objection';

interface QueryAndThrowOptions {
  type?: string;
  message: string;
}

// @ts-ignore
export class PaginationQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  // These are necessary. You can just copy-paste them and change the
  // name of the query builder class.
  ArrayQueryBuilderType!: PaginationQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: PaginationQueryBuilder<M, M>;
  MaybeSingleQueryBuilderType!: PaginationQueryBuilder<M, M | undefined>;
  NumberQueryBuilderType!: PaginationQueryBuilder<M, number>;
  PageQueryBuilderType!: PaginationQueryBuilder<M, Page<M>>;

  pagination(page: number, pageSize: number) {
    return this.page(page, pageSize).runAfter(({ results, total }) => ({
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
    const relations = Object.keys(relationMappings).filter((relation) => {
      const relType = relationMappings[relation]?.relation;
      return [Model.HasManyRelation, Model.HasOneRelation].includes(relType as RelationType);
    });

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
