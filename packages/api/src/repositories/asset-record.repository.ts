import {DefaultCrudRepository} from '@loopback/repository';
import {AssetRecord, AssetRecordRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AssetRecordRepository extends DefaultCrudRepository<
  AssetRecord,
  typeof AssetRecord.prototype.id,
  AssetRecordRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(AssetRecord, dataSource);
  }
}
