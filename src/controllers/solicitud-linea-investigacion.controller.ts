import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  LineaInvestigacion, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudLineaInvestigacionController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/linea-investigacion', {
    responses: {
      '200': {
        description: 'Solicitud has one LineaInvestigacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LineaInvestigacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaInvestigacion>,
  ): Promise<LineaInvestigacion> {
    return this.solicitudRepository.lineaInvestigacion(id).get(filter);
  }

  @post('/solicituds/{id}/linea-investigacion', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaInvestigacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {
            title: 'NewLineaInvestigacionInSolicitud',
            // exclude: ['_id'],
            // optional: ['idLineaInvestigacion']
          }),
        },
      },
    }) lineaInvestigacion: Omit<LineaInvestigacion, '_id'>,
  ): Promise<LineaInvestigacion> {
    return this.solicitudRepository.lineaInvestigacion(id).create(lineaInvestigacion);
  }

  @patch('/solicituds/{id}/linea-investigacion', {
    responses: {
      '200': {
        description: 'Solicitud.LineaInvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: Partial<LineaInvestigacion>,
    @param.query.object('where', getWhereSchemaFor(LineaInvestigacion)) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.solicitudRepository.lineaInvestigacion(id).patch(lineaInvestigacion, where);
  }

  @del('/solicituds/{id}/linea-investigacion', {
    responses: {
      '200': {
        description: 'Solicitud.LineaInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaInvestigacion)) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.solicitudRepository.lineaInvestigacion(id).delete(where);
  }
}
