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
  Departamento,
  Proponente,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoProponenteController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Proponente',
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
    return this.departamentoRepository.proponentes(id).find(filter);
  }

  @post('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInDepartamento',
            exclude: ['_id'],
            optional: ['idDepartamento']
          }),
        },
      },
    }) proponente: Omit<Proponente, '_id'>,
  ): Promise<Proponente> {
    return this.departamentoRepository.proponentes(id).create(proponente);
  }

  @patch('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Departamento.Proponente PATCH success count',
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
    return this.departamentoRepository.proponentes(id).patch(proponente, where);
  }

  @del('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Departamento.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.departamentoRepository.proponentes(id).delete(where);
  }
}
