import {Entity, model, property, hasOne} from '@loopback/repository';
import {SolicitudJuradoEvaluar} from './solicitud-jurado-evaluar.model';

@model()
export class ResultadoEvaluacion extends Entity {
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
  descripcion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  formatoDiligenciado: string;

  @hasOne(() => SolicitudJuradoEvaluar, {keyTo: 'idSolicitudJuradoEvaluar'})
  solicitudJuradoEvaluar: SolicitudJuradoEvaluar;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion & ResultadoEvaluacionRelations;
