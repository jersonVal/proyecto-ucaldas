import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoVinculacion, TipoVinculacionRelations} from '../models';

export class TipoVinculacionRepository extends DefaultCrudRepository<
  TipoVinculacion,
  typeof TipoVinculacion.prototype._id,
  TipoVinculacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoVinculacion, dataSource);
  }
}
