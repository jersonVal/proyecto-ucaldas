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
  Modalidad,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudModalidadController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/modalidad', {
    responses: {
      '200': {
        description: 'Solicitud has one Modalidad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Modalidad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Modalidad>,
  ): Promise<Modalidad> {
    return this.solicitudRepository.modalidad(id).get(filter);
  }

  @post('/solicituds/{id}/modalidad', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Modalidad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {
            title: 'NewModalidadInSolicitud',
            exclude: ['_id'],
            optional: ['idModalidad']
          }),
        },
      },
    }) modalidad: Omit<Modalidad, '_id'>,
  ): Promise<Modalidad> {
    return this.solicitudRepository.modalidad(id).create(modalidad);
  }

  @patch('/solicituds/{id}/modalidad', {
    responses: {
      '200': {
        description: 'Solicitud.Modalidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {partial: true}),
        },
      },
    })
    modalidad: Partial<Modalidad>,
    @param.query.object('where', getWhereSchemaFor(Modalidad)) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.solicitudRepository.modalidad(id).patch(modalidad, where);
  }

  @del('/solicituds/{id}/modalidad', {
    responses: {
      '200': {
        description: 'Solicitud.Modalidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Modalidad)) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.solicitudRepository.modalidad(id).delete(where);
  }
}
