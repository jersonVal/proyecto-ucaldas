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
Jurado,
JuradoLineaInvestigacion,
LineaInvestigacion,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoLineaInvestigacionController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/linea-investigacions', {
    responses: {
      '200': {
        description: 'Array of Jurado has many LineaInvestigacion through JuradoLineaInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineaInvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaInvestigacion>,
  ): Promise<LineaInvestigacion[]> {
    return this.juradoRepository.lineaInvestigacions(id).find(filter);
  }

  @post('/jurados/{id}/linea-investigacions', {
    responses: {
      '200': {
        description: 'create a LineaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaInvestigacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Jurado.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {
            title: 'NewLineaInvestigacionInJurado',
            exclude: ['_id'],
          }),
        },
      },
    }) lineaInvestigacion: Omit<LineaInvestigacion, '_id'>,
  ): Promise<LineaInvestigacion> {
    return this.juradoRepository.lineaInvestigacions(id).create(lineaInvestigacion);
  }

  @patch('/jurados/{id}/linea-investigacions', {
    responses: {
      '200': {
        description: 'Jurado.LineaInvestigacion PATCH success count',
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
    return this.juradoRepository.lineaInvestigacions(id).patch(lineaInvestigacion, where);
  }

  @del('/jurados/{id}/linea-investigacions', {
    responses: {
      '200': {
        description: 'Jurado.LineaInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaInvestigacion)) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.lineaInvestigacions(id).delete(where);
  }
}
