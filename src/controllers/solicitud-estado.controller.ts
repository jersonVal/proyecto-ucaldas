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
  Estado,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudEstadoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/estado', {
    responses: {
      '200': {
        description: 'Solicitud has one Estado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Estado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estado>,
  ): Promise<Estado> {
    return this.solicitudRepository.estado(id).get(filter);
  }

  @post('/solicituds/{id}/estado', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {
            title: 'NewEstadoInSolicitud',
            exclude: ['_id'],
            optional: ['idSolicitud']
          }),
        },
      },
    }) estado: Omit<Estado, '_id'>,
  ): Promise<Estado> {
    return this.solicitudRepository.estado(id).create(estado);
  }

  @patch('/solicituds/{id}/estado', {
    responses: {
      '200': {
        description: 'Solicitud.Estado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {partial: true}),
        },
      },
    })
    estado: Partial<Estado>,
    @param.query.object('where', getWhereSchemaFor(Estado)) where?: Where<Estado>,
  ): Promise<Count> {
    return this.solicitudRepository.estado(id).patch(estado, where);
  }

  @del('/solicituds/{id}/estado', {
    responses: {
      '200': {
        description: 'Solicitud.Estado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estado)) where?: Where<Estado>,
  ): Promise<Count> {
    return this.solicitudRepository.estado(id).delete(where);
  }
}
