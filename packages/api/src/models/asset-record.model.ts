import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Asset, AssetWithRelations } from './asset.model';

@model()
export class AssetRecord extends Entity {
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
  
  @belongsTo(() => Asset)
  assetId: number;


  constructor(data?: Partial<AssetRecord>) {
    super(data);
  }
}

export interface AssetRecordRelations {
  asset?: AssetWithRelations
}

export type AssetRecordWithRelations = AssetRecord & AssetRecordRelations;
