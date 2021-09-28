import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoComite, TipoComiteRelations} from '../models';

export class TipoComiteRepository extends DefaultCrudRepository<
  TipoComite,
  typeof TipoComite.prototype._id,
  TipoComiteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoComite, dataSource);
  }
}
