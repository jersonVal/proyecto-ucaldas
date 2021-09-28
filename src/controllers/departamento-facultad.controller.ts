import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Facultad,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoFacultadController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/facultad', {
    responses: {
      '200': {
        description: 'Facultad belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Facultad)},
          },
        },
      },
    },
  })
  async getFacultad(
    @param.path.string('id') id: typeof Departamento.prototype._id,
  ): Promise<Facultad> {
    return this.departamentoRepository.pertenece(id);
  }
}
