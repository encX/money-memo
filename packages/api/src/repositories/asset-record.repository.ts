import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AssetRecord, AssetRecordRelations, AssetType} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AssetTypeRepository} from './asset-type.repository';

export class AssetRecordRepository extends DefaultCrudRepository<
  AssetRecord,
  typeof AssetRecord.prototype.id,
  AssetRecordRelations
> {

  public readonly assetType: BelongsToAccessor<AssetType, typeof AssetRecord.prototype.id>;

  constructor(
    @inject('datasources.Pg') dataSource: PgDataSource, @repository.getter('AssetTypeRepository') protected assetTypeRepositoryGetter: Getter<AssetTypeRepository>,
  ) {
    super(AssetRecord, dataSource);
    this.assetType = this.createBelongsToAccessorFor('assetType', assetTypeRepositoryGetter,);
    this.registerInclusionResolver('assetType', this.assetType.inclusionResolver);
  }
}
