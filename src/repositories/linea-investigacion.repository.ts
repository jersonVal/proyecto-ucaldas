import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LineaInvestigacion, LineaInvestigacionRelations} from '../models';

export class LineaInvestigacionRepository extends DefaultCrudRepository<
  LineaInvestigacion,
  typeof LineaInvestigacion.prototype._id,
  LineaInvestigacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LineaInvestigacion, dataSource);
  }
}
