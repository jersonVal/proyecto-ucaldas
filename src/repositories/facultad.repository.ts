import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Facultad, FacultadRelations, Departamento} from '../models';
import {DepartamentoRepository} from './departamento.repository';

export class FacultadRepository extends DefaultCrudRepository<
  Facultad,
  typeof Facultad.prototype._id,
  FacultadRelations
> {

  public readonly departamentos: HasManyRepositoryFactory<Departamento, typeof Facultad.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Facultad, dataSource);
    this.departamentos = this.createHasManyRepositoryFactoryFor('departamentos', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
