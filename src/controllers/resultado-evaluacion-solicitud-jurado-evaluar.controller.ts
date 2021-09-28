import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ResultadoEvaluacion,
  SolicitudJuradoEvaluar,
} from '../models';
import {ResultadoEvaluacionRepository} from '../repositories';

export class ResultadoEvaluacionSolicitudJuradoEvaluarController {
  constructor(
    @repository(ResultadoEvaluacionRepository) protected resultadoEvaluacionRepository: ResultadoEvaluacionRepository,
  ) { }

  @get('/resultado-evaluacions/{id}/solicitud-jurado-evaluar', {
    responses: {
      '200': {
        description: 'ResultadoEvaluacion has one SolicitudJuradoEvaluar',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudJuradoEvaluar),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudJuradoEvaluar>,
  ): Promise<SolicitudJuradoEvaluar> {
    return this.resultadoEvaluacionRepository.solicitudJuradoEvaluar(id).get(filter);
  }

  @post('/resultado-evaluacions/{id}/solicitud-jurado-evaluar', {
    responses: {
      '200': {
        description: 'ResultadoEvaluacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudJuradoEvaluar)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ResultadoEvaluacion.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudJuradoEvaluar, {
            title: 'NewSolicitudJuradoEvaluarInResultadoEvaluacion',
            exclude: ['_id'],
            optional: ['idSolicitudJuradoEvaluar']
          }),
        },
      },
    }) solicitudJuradoEvaluar: Omit<SolicitudJuradoEvaluar, '_id'>,
  ): Promise<SolicitudJuradoEvaluar> {
    return this.resultadoEvaluacionRepository.solicitudJuradoEvaluar(id).create(solicitudJuradoEvaluar);
  }

  @patch('/resultado-evaluacions/{id}/solicitud-jurado-evaluar', {
    responses: {
      '200': {
        description: 'ResultadoEvaluacion.SolicitudJuradoEvaluar PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudJuradoEvaluar, {partial: true}),
        },
      },
    })
    solicitudJuradoEvaluar: Partial<SolicitudJuradoEvaluar>,
    @param.query.object('where', getWhereSchemaFor(SolicitudJuradoEvaluar)) where?: Where<SolicitudJuradoEvaluar>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.solicitudJuradoEvaluar(id).patch(solicitudJuradoEvaluar, where);
  }

  @del('/resultado-evaluacions/{id}/solicitud-jurado-evaluar', {
    responses: {
      '200': {
        description: 'ResultadoEvaluacion.SolicitudJuradoEvaluar DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudJuradoEvaluar)) where?: Where<SolicitudJuradoEvaluar>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.solicitudJuradoEvaluar(id).delete(where);
  }
}
