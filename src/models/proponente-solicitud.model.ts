import {Entity, model, property} from '@loopback/repository';

@model()
export class ProponenteSolicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  idSolicitud?: string;

  @property({
    type: 'string',
  })
  idProponente?: string;

  constructor(data?: Partial<ProponenteSolicitud>) {
    super(data);
  }
}

export interface ProponenteSolicitudRelations {
  // describe navigational properties here
}

export type ProponenteSolicitudWithRelations = ProponenteSolicitud & ProponenteSolicitudRelations;
