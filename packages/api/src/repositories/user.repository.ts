import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, AssetType} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AssetTypeRepository} from './asset-type.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly assetTypes: HasManyRepositoryFactory<AssetType, typeof User.prototype.id>;

  constructor(
    @inject('datasources.Pg') dataSource: PgDataSource, @repository.getter('AssetTypeRepository') protected assetTypeRepositoryGetter: Getter<AssetTypeRepository>,
  ) {
    super(User, dataSource);
    this.assetTypes = this.createHasManyRepositoryFactoryFor('assetTypes', assetTypeRepositoryGetter,);
    this.registerInclusionResolver('assetTypes', this.assetTypes.inclusionResolver);
  }
}
