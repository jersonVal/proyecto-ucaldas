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
import {LineaInvestigacion} from '../models';
import {LineaInvestigacionRepository} from '../repositories';

export class LineaInvestigacionController {
  constructor(
    @repository(LineaInvestigacionRepository)
    public lineaInvestigacionRepository : LineaInvestigacionRepository,
  ) {}

  @post('/linea-investigacion')
  @response(200, {
    description: 'LineaInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {
            title: 'NewLineaInvestigacion',
            exclude: ['_id'],
          }),
        },
      },
    })
    lineaInvestigacion: Omit<LineaInvestigacion, '_id'>,
  ): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionRepository.create(lineaInvestigacion);
  }

  @get('/linea-investigacion/count')
  @response(200, {
    description: 'LineaInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaInvestigacion) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.count(where);
  }

  @get('/linea-investigacion')
  @response(200, {
    description: 'Array of LineaInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaInvestigacion) filter?: Filter<LineaInvestigacion>,
  ): Promise<LineaInvestigacion[]> {
    return this.lineaInvestigacionRepository.find(filter);
  }

  @patch('/linea-investigacion')
  @response(200, {
    description: 'LineaInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: LineaInvestigacion,
    @param.where(LineaInvestigacion) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.updateAll(lineaInvestigacion, where);
  }

  @get('/linea-investigacion/{id}')
  @response(200, {
    description: 'LineaInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LineaInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaInvestigacion>
  ): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionRepository.findById(id, filter);
  }

  @patch('/linea-investigacion/{id}')
  @response(204, {
    description: 'LineaInvestigacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: LineaInvestigacion,
  ): Promise<void> {
    await this.lineaInvestigacionRepository.updateById(id, lineaInvestigacion);
  }

  @put('/linea-investigacion/{id}')
  @response(204, {
    description: 'LineaInvestigacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lineaInvestigacion: LineaInvestigacion,
  ): Promise<void> {
    await this.lineaInvestigacionRepository.replaceById(id, lineaInvestigacion);
  }

  @del('/linea-investigacion/{id}')
  @response(204, {
    description: 'LineaInvestigacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lineaInvestigacionRepository.deleteById(id);
  }
}
