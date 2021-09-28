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
  Proponente,
  TipoVinculacion,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteTipoVinculacionController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'Proponente has one TipoVinculacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoVinculacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoVinculacion>,
  ): Promise<TipoVinculacion> {
    return this.proponenteRepository.tipoVinculacion(id).get(filter);
  }

  @post('/proponentes/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVinculacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proponente.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {
            title: 'NewTipoVinculacionInProponente',
            exclude: ['_id'],
            optional: ['idProponente']
          }),
        },
      },
    }) tipoVinculacion: Omit<TipoVinculacion, '_id'>,
  ): Promise<TipoVinculacion> {
    return this.proponenteRepository.tipoVinculacion(id).create(tipoVinculacion);
  }

  @patch('/proponentes/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'Proponente.TipoVinculacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: Partial<TipoVinculacion>,
    @param.query.object('where', getWhereSchemaFor(TipoVinculacion)) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.proponenteRepository.tipoVinculacion(id).patch(tipoVinculacion, where);
  }

  @del('/proponentes/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'Proponente.TipoVinculacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVinculacion)) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.proponenteRepository.tipoVinculacion(id).delete(where);
  }
}
