import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Modalidad, ModalidadRelations} from '../models';

export class ModalidadRepository extends DefaultCrudRepository<
  Modalidad,
  typeof Modalidad.prototype._id,
  ModalidadRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Modalidad, dataSource);
  }
}
