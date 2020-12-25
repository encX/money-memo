import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {AssetType, AssetTypeRelations, AssetRecord} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AssetRecordRepository} from './asset-record.repository';

export class AssetTypeRepository extends DefaultCrudRepository<
  AssetType,
  typeof AssetType.prototype.id,
  AssetTypeRelations
> {

  public readonly assetRecord: HasOneRepositoryFactory<AssetRecord, typeof AssetType.prototype.id>;

  constructor(
    @inject('datasources.Pg') dataSource: PgDataSource, @repository.getter('AssetRecordRepository') protected assetRecordRepositoryGetter: Getter<AssetRecordRepository>,
  ) {
    super(AssetType, dataSource);
    this.assetRecord = this.createHasOneRepositoryFactoryFor('assetRecord', assetRecordRepositoryGetter);
  }
}
