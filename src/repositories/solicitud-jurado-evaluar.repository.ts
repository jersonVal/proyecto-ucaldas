import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudJuradoEvaluar, SolicitudJuradoEvaluarRelations} from '../models';

export class SolicitudJuradoEvaluarRepository extends DefaultCrudRepository<
  SolicitudJuradoEvaluar,
  typeof SolicitudJuradoEvaluar.prototype._id,
  SolicitudJuradoEvaluarRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SolicitudJuradoEvaluar, dataSource);
  }
}
