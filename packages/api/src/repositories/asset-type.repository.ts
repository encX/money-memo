import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AssetType, AssetTypeRelations, AssetRecord, User} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AssetRecordRepository} from './asset-record.repository';
import {UserRepository} from './user.repository';

export class AssetTypeRepository extends DefaultCrudRepository<
  AssetType,
  typeof AssetType.prototype.id,
  AssetTypeRelations
> {

  public readonly assetRecords: HasManyRepositoryFactory<AssetRecord, typeof AssetType.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof AssetType.prototype.id>;

  constructor(
    @inject('datasources.Pg') dataSource: PgDataSource, @repository.getter('AssetRecordRepository') protected assetRecordRepositoryGetter: Getter<AssetRecordRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(AssetType, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.assetRecords = this.createHasManyRepositoryFactoryFor('assetRecords', assetRecordRepositoryGetter,);
    this.registerInclusionResolver('assetRecords', this.assetRecords.inclusionResolver);
  }
}
