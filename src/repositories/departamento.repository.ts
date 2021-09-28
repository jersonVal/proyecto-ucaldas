import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad, Proponente} from '../models';
import {FacultadRepository} from './facultad.repository';
import {ProponenteRepository} from './proponente.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype._id,
  DepartamentoRelations
> {

  public readonly pertenece: BelongsToAccessor<Facultad, typeof Departamento.prototype._id>;

  public readonly proponentes: HasManyRepositoryFactory<Proponente, typeof Departamento.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Departamento, dataSource);
    this.proponentes = this.createHasManyRepositoryFactoryFor('proponentes', proponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', facultadRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
  }
}
