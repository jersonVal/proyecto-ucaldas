import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoSolicitud} from '../models';
import {TipoSolicitudRepository} from '../repositories';

export class TipoSolicitudController {
  constructor(
    @repository(TipoSolicitudRepository)
    public tipoSolicitudRepository : TipoSolicitudRepository,
  ) {}

  @post('/tipo-solicitud')
  @response(200, {
    description: 'TipoSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {
            title: 'NewTipoSolicitud',
            exclude: ['_id'],
          }),
        },
      },
    })
    tipoSolicitud: Omit<TipoSolicitud, '_id'>,
  ): Promise<TipoSolicitud> {
    return this.tipoSolicitudRepository.create(tipoSolicitud);
  }

  @get('/tipo-solicitud/count')
  @response(200, {
    description: 'TipoSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoSolicitud) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.tipoSolicitudRepository.count(where);
  }

  @get('/tipo-solicitud')
  @response(200, {
    description: 'Array of TipoSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoSolicitud) filter?: Filter<TipoSolicitud>,
  ): Promise<TipoSolicitud[]> {
    return this.tipoSolicitudRepository.find(filter);
  }

  @patch('/tipo-solicitud')
  @response(200, {
    description: 'TipoSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {partial: true}),
        },
      },
    })
    tipoSolicitud: TipoSolicitud,
    @param.where(TipoSolicitud) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.tipoSolicitudRepository.updateAll(tipoSolicitud, where);
  }

  @get('/tipo-solicitud/{id}')
  @response(200, {
    description: 'TipoSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoSolicitud>
  ): Promise<TipoSolicitud> {
    return this.tipoSolicitudRepository.findById(id, filter);
  }

  @patch('/tipo-solicitud/{id}')
  @response(204, {
    description: 'TipoSolicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {partial: true}),
        },
      },
    })
    tipoSolicitud: TipoSolicitud,
  ): Promise<void> {
    await this.tipoSolicitudRepository.updateById(id, tipoSolicitud);
  }

  @put('/tipo-solicitud/{id}')
  @response(204, {
    description: 'TipoSolicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoSolicitud: TipoSolicitud,
  ): Promise<void> {
    await this.tipoSolicitudRepository.replaceById(id, tipoSolicitud);
  }

  @del('/tipo-solicitud/{id}')
  @response(204, {
    description: 'TipoSolicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoSolicitudRepository.deleteById(id);
  }
}
