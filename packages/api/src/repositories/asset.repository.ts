import {DefaultCrudRepository} from '@loopback/repository';
import {Asset, AssetRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AssetRepository extends DefaultCrudRepository<
  Asset,
  typeof Asset.prototype.id,
  AssetRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Asset, dataSource);
  }
}
