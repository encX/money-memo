import {Entity, model, property, hasOne} from '@loopback/repository';
import {AssetRecord} from './asset-record.model';

@model()
export class AssetType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @hasOne(() => AssetRecord)
  assetRecord: AssetRecord;

  constructor(data?: Partial<AssetType>) {
    super(data);
  }
}

export interface AssetTypeRelations {
  // describe navigational properties here
}

export type AssetTypeWithRelations = AssetType & AssetTypeRelations;
