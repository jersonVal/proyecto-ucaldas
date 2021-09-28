import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {ProponenteSolicitud} from './proponente-solicitud.model';
import {Estado} from './estado.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {Modalidad} from './modalidad.model';
import {TipoComite} from './tipo-comite.model';
import {SolicitudComite} from './solicitud-comite.model';
import {LineaInvestigacion} from './linea-investigacion.model';
import {Jurado} from './jurado.model';
import {SolicitudJuradoEvaluar} from './solicitud-jurado-evaluar.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @hasMany(() => Proponente, {through: {model: () => ProponenteSolicitud, keyFrom: 'idSolicitud', keyTo: 'idProponente'}})
  proponentes: Proponente[];

  @hasOne(() => Estado, {keyTo: 'idEstado'})
  estado: Estado;

  @hasOne(() => TipoSolicitud, {keyTo: 'idTipoSolicitud'})
  tipoSolicitud: TipoSolicitud;

  @hasOne(() => Modalidad, {keyTo: 'idModalidad'})
  modalidad: Modalidad;

  @hasMany(() => TipoComite, {through: {model: () => SolicitudComite, keyFrom: 'idSolicitud', keyTo: 'idTipoComite'}})
  tipoComites: TipoComite[];

  @hasOne(() => LineaInvestigacion, {keyTo: 'idLineaInvestigacion'})
  lineaInvestigacion: LineaInvestigacion;

  @hasMany(() => Jurado, {through: {model: () => SolicitudJuradoEvaluar, keyFrom: 'idSolicitud', keyTo: 'idJurado'}})
  jurados: Jurado[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
