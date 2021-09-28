import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Jurado, JuradoRelations, LineaInvestigacion, JuradoLineaInvestigacion} from '../models';
import {JuradoLineaInvestigacionRepository} from './jurado-linea-investigacion.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype._id,
  JuradoRelations
> {

  public readonly lineaInvestigacions: HasManyThroughRepositoryFactory<LineaInvestigacion, typeof LineaInvestigacion.prototype._id,
          JuradoLineaInvestigacion,
          typeof Jurado.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('JuradoLineaInvestigacionRepository') protected juradoLineaInvestigacionRepositoryGetter: Getter<JuradoLineaInvestigacionRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>,
  ) {
    super(Jurado, dataSource);
    this.lineaInvestigacions = this.createHasManyThroughRepositoryFactoryFor('lineaInvestigacions', lineaInvestigacionRepositoryGetter, juradoLineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('lineaInvestigacions', this.lineaInvestigacions.inclusionResolver);
  }
}
