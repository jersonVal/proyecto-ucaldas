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
  TipoSolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudTipoSolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'Solicitud has one TipoSolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoSolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoSolicitud>,
  ): Promise<TipoSolicitud> {
    return this.solicitudRepository.tipoSolicitud(id).get(filter);
  }

  @post('/solicituds/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {
            title: 'NewTipoSolicitudInSolicitud',
            exclude: ['_id'],
            optional: ['idTipoSolicitud']
          }),
        },
      },
    }) tipoSolicitud: Omit<TipoSolicitud, '_id'>,
  ): Promise<TipoSolicitud> {
    return this.solicitudRepository.tipoSolicitud(id).create(tipoSolicitud);
  }

  @patch('/solicituds/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'Solicitud.TipoSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {partial: true}),
        },
      },
    })
    tipoSolicitud: Partial<TipoSolicitud>,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.tipoSolicitud(id).patch(tipoSolicitud, where);
  }

  @del('/solicituds/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'Solicitud.TipoSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.tipoSolicitud(id).delete(where);
  }
}
