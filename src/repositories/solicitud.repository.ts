import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponente, ProponenteSolicitud, Estado, TipoSolicitud, Modalidad, TipoComite, SolicitudComite, LineaInvestigacion, Jurado, SolicitudJuradoEvaluar} from '../models';
import {ProponenteSolicitudRepository} from './proponente-solicitud.repository';
import {ProponenteRepository} from './proponente.repository';
import {EstadoRepository} from './estado.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {SolicitudComiteRepository} from './solicitud-comite.repository';
import {TipoComiteRepository} from './tipo-comite.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';
import {SolicitudJuradoEvaluarRepository} from './solicitud-jurado-evaluar.repository';
import {JuradoRepository} from './jurado.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype._id,
  SolicitudRelations
> {

  public readonly proponentes: HasManyThroughRepositoryFactory<Proponente, typeof Proponente.prototype._id,
          ProponenteSolicitud,
          typeof Solicitud.prototype._id
        >;

  public readonly estado: HasOneRepositoryFactory<Estado, typeof Solicitud.prototype._id>;

  public readonly tipoSolicitud: HasOneRepositoryFactory<TipoSolicitud, typeof Solicitud.prototype._id>;

  public readonly modalidad: HasOneRepositoryFactory<Modalidad, typeof Solicitud.prototype._id>;

  public readonly tipoComites: HasManyThroughRepositoryFactory<TipoComite, typeof TipoComite.prototype._id,
          SolicitudComite,
          typeof Solicitud.prototype._id
        >;

  public readonly lineaInvestigacion: HasOneRepositoryFactory<LineaInvestigacion, typeof Solicitud.prototype._id>;

  public readonly jurados: HasManyThroughRepositoryFactory<Jurado, typeof Jurado.prototype._id,
          SolicitudJuradoEvaluar,
          typeof Solicitud.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProponenteSolicitudRepository') protected proponenteSolicitudRepositoryGetter: Getter<ProponenteSolicitudRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('SolicitudComiteRepository') protected solicitudComiteRepositoryGetter: Getter<SolicitudComiteRepository>, @repository.getter('TipoComiteRepository') protected tipoComiteRepositoryGetter: Getter<TipoComiteRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>, @repository.getter('SolicitudJuradoEvaluarRepository') protected solicitudJuradoEvaluarRepositoryGetter: Getter<SolicitudJuradoEvaluarRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.jurados = this.createHasManyThroughRepositoryFactoryFor('jurados', juradoRepositoryGetter, solicitudJuradoEvaluarRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
    this.lineaInvestigacion = this.createHasOneRepositoryFactoryFor('lineaInvestigacion', lineaInvestigacionRepositoryGetter);
    this.registerInclusionResolver('lineaInvestigacion', this.lineaInvestigacion.inclusionResolver);
    this.tipoComites = this.createHasManyThroughRepositoryFactoryFor('tipoComites', tipoComiteRepositoryGetter, solicitudComiteRepositoryGetter,);
    this.registerInclusionResolver('tipoComites', this.tipoComites.inclusionResolver);
    this.modalidad = this.createHasOneRepositoryFactoryFor('modalidad', modalidadRepositoryGetter);
    this.registerInclusionResolver('modalidad', this.modalidad.inclusionResolver);
    this.tipoSolicitud = this.createHasOneRepositoryFactoryFor('tipoSolicitud', tipoSolicitudRepositoryGetter);
    this.registerInclusionResolver('tipoSolicitud', this.tipoSolicitud.inclusionResolver);
    this.estado = this.createHasOneRepositoryFactoryFor('estado', estadoRepositoryGetter);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
    this.proponentes = this.createHasManyThroughRepositoryFactoryFor('proponentes', proponenteRepositoryGetter, proponenteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
