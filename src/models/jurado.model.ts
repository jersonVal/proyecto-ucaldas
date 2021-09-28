import {Entity, model, property, hasMany} from '@loopback/repository';
import {LineaInvestigacion} from './linea-investigacion.model';
import {JuradoLineaInvestigacion} from './jurado-linea-investigacion.model';

@model()
export class Jurado extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @hasMany(() => LineaInvestigacion, {through: {model: () => JuradoLineaInvestigacion, keyFrom: 'idJurado', keyTo: 'idLineaInvestigacion'}})
  lineaInvestigacions: LineaInvestigacion[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
