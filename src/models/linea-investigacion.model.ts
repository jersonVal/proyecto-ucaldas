import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaInvestigacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  idLineaInvestigacion?: string;

  constructor(data?: Partial<LineaInvestigacion>) {
    super(data);
  }
}

export interface LineaInvestigacionRelations {
  // describe navigational properties here
}

export type LineaInvestigacionWithRelations = LineaInvestigacion & LineaInvestigacionRelations;
