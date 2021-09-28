import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamento, TipoVinculacion} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype._id,
  ProponenteRelations
> {

  public readonly pertenece: BelongsToAccessor<Departamento, typeof Proponente.prototype._id>;

  public readonly tipoVinculacion: HasOneRepositoryFactory<TipoVinculacion, typeof Proponente.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>,
  ) {
    super(Proponente, dataSource);
    this.tipoVinculacion = this.createHasOneRepositoryFactoryFor('tipoVinculacion', tipoVinculacionRepositoryGetter);
    this.registerInclusionResolver('tipoVinculacion', this.tipoVinculacion.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', departamentoRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
  }
}
