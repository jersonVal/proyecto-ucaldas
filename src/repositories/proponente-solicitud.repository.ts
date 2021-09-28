import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProponenteSolicitud, ProponenteSolicitudRelations} from '../models';

export class ProponenteSolicitudRepository extends DefaultCrudRepository<
  ProponenteSolicitud,
  typeof ProponenteSolicitud.prototype._id,
  ProponenteSolicitudRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProponenteSolicitud, dataSource);
  }
}
