import {Entity, model, property, hasMany} from '@loopback/repository';
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

  @hasMany(() => AssetRecord)
  assetRecords: AssetRecord[];

  constructor(data?: Partial<AssetType>) {
    super(data);
  }
}

export interface AssetTypeRelations {
  // describe navigational properties here
}

export type AssetTypeWithRelations = AssetType & AssetTypeRelations;
