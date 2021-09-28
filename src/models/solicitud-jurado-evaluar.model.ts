import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudJuradoEvaluar extends Entity {
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
  fechaInvitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRespuesta: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoInvitacion: boolean;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
  })
  idSolicitud?: string;

  @property({
    type: 'string',
  })
  idJurado?: string;

  @property({
    type: 'string',
  })
  idSolicitudJuradoEvaluar?: string;

  constructor(data?: Partial<SolicitudJuradoEvaluar>) {
    super(data);
  }
}

export interface SolicitudJuradoEvaluarRelations {
  // describe navigational properties here
}

export type SolicitudJuradoEvaluarWithRelations = SolicitudJuradoEvaluar & SolicitudJuradoEvaluarRelations;
