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
Solicitud,
SolicitudJuradoEvaluar,
Jurado,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudJuradoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Jurado through SolicitudJuradoEvaluar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.solicitudRepository.jurados(id).find(filter);
  }

  @post('/solicituds/{id}/jurados', {
    responses: {
      '200': {
        description: 'create a Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJuradoInSolicitud',
            exclude: ['_id'],
          }),
        },
      },
    }) jurado: Omit<Jurado, '_id'>,
  ): Promise<Jurado> {
    return this.solicitudRepository.jurados(id).create(jurado);
  }

  @patch('/solicituds/{id}/jurados', {
    responses: {
      '200': {
        description: 'Solicitud.Jurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Partial<Jurado>,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.solicitudRepository.jurados(id).patch(jurado, where);
  }

  @del('/solicituds/{id}/jurados', {
    responses: {
      '200': {
        description: 'Solicitud.Jurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.solicitudRepository.jurados(id).delete(where);
  }
}
