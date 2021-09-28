import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ResultadoEvaluacion, ResultadoEvaluacionRelations, SolicitudJuradoEvaluar} from '../models';
import {SolicitudJuradoEvaluarRepository} from './solicitud-jurado-evaluar.repository';

export class ResultadoEvaluacionRepository extends DefaultCrudRepository<
  ResultadoEvaluacion,
  typeof ResultadoEvaluacion.prototype._id,
  ResultadoEvaluacionRelations
> {

  public readonly solicitudJuradoEvaluar: HasOneRepositoryFactory<SolicitudJuradoEvaluar, typeof ResultadoEvaluacion.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudJuradoEvaluarRepository') protected solicitudJuradoEvaluarRepositoryGetter: Getter<SolicitudJuradoEvaluarRepository>,
  ) {
    super(ResultadoEvaluacion, dataSource);
    this.solicitudJuradoEvaluar = this.createHasOneRepositoryFactoryFor('solicitudJuradoEvaluar', solicitudJuradoEvaluarRepositoryGetter);
    this.registerInclusionResolver('solicitudJuradoEvaluar', this.solicitudJuradoEvaluar.inclusionResolver);
  }
}
