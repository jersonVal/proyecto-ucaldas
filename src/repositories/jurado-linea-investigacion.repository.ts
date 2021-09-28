import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {JuradoLineaInvestigacion, JuradoLineaInvestigacionRelations} from '../models';

export class JuradoLineaInvestigacionRepository extends DefaultCrudRepository<
  JuradoLineaInvestigacion,
  typeof JuradoLineaInvestigacion.prototype._id,
  JuradoLineaInvestigacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(JuradoLineaInvestigacion, dataSource);
  }
}
