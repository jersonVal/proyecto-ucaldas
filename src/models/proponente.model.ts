import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model()
export class Proponente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'object',
  })
  foto?: object;

  @belongsTo(() => Departamento, {name: 'pertenece'})
  idDepartamento: string;

  @hasOne(() => TipoVinculacion, {keyTo: 'idTipoVinculacion'})
  tipoVinculacion: TipoVinculacion;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
