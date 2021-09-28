import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoComite extends Entity {
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


  constructor(data?: Partial<TipoComite>) {
    super(data);
  }
}

export interface TipoComiteRelations {
  // describe navigational properties here
}

export type TipoComiteWithRelations = TipoComite & TipoComiteRelations;
