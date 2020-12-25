import {Entity, model, property} from '@loopback/repository';

@model()
export class AssetRecord extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
  })
  assetTypeId?: number;

  constructor(data?: Partial<AssetRecord>) {
    super(data);
  }
}

export interface AssetRecordRelations {
  // describe navigational properties here
}

export type AssetRecordWithRelations = AssetRecord & AssetRecordRelations;
