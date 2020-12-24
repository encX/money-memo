import { Entity, hasMany, model, property } from '@loopback/repository';
import { AssetRecord, AssetRecordWithRelations } from './asset-record.model';

@model()
export class Asset extends Entity {
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
  records: AssetRecord[];

  constructor(data?: Partial<Asset>) {
    super(data);
  }
}

export interface AssetRelations {
  records?: AssetRecordWithRelations[];
}

export type AssetWithRelations = Asset & AssetRelations;
