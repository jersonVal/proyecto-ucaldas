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
import {Modalidad} from '../models';
import {ModalidadRepository} from '../repositories';

export class ModalidadController {
  constructor(
    @repository(ModalidadRepository)
    public modalidadRepository : ModalidadRepository,
  ) {}

  @post('/modalidad')
  @response(200, {
    description: 'Modalidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Modalidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {
            title: 'NewModalidad',
            exclude: ['_id'],
          }),
        },
      },
    })
    modalidad: Omit<Modalidad, '_id'>,
  ): Promise<Modalidad> {
    return this.modalidadRepository.create(modalidad);
  }

  @get('/modalidad/count')
  @response(200, {
    description: 'Modalidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Modalidad) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.modalidadRepository.count(where);
  }

  @get('/modalidad')
  @response(200, {
    description: 'Array of Modalidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Modalidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Modalidad) filter?: Filter<Modalidad>,
  ): Promise<Modalidad[]> {
    return this.modalidadRepository.find(filter);
  }

  @patch('/modalidad')
  @response(200, {
    description: 'Modalidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {partial: true}),
        },
      },
    })
    modalidad: Modalidad,
    @param.where(Modalidad) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.modalidadRepository.updateAll(modalidad, where);
  }

  @get('/modalidad/{id}')
  @response(200, {
    description: 'Modalidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Modalidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Modalidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Modalidad>
  ): Promise<Modalidad> {
    return this.modalidadRepository.findById(id, filter);
  }

  @patch('/modalidad/{id}')
  @response(204, {
    description: 'Modalidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {partial: true}),
        },
      },
    })
    modalidad: Modalidad,
  ): Promise<void> {
    await this.modalidadRepository.updateById(id, modalidad);
  }

  @put('/modalidad/{id}')
  @response(204, {
    description: 'Modalidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() modalidad: Modalidad,
  ): Promise<void> {
    await this.modalidadRepository.replaceById(id, modalidad);
  }

  @del('/modalidad/{id}')
  @response(204, {
    description: 'Modalidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.modalidadRepository.deleteById(id);
  }
}
