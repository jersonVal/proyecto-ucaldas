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
ProponenteSolicitud,
Proponente,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Proponente through ProponenteSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.solicitudRepository.proponentes(id).find(filter);
  }

  @post('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'create a Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInSolicitud',
            exclude: ['_id'],
          }),
        },
      },
    }) proponente: Omit<Proponente, '_id'>,
  ): Promise<Proponente> {
    return this.solicitudRepository.proponentes(id).create(proponente);
  }

  @patch('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).patch(proponente, where);
  }

  @del('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).delete(where);
  }
}
