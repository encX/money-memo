import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AssetRecord,
  AssetType,
} from '../models';
import {AssetRecordRepository} from '../repositories';

export class AssetRecordAssetTypeController {
  constructor(
    @repository(AssetRecordRepository)
    public assetRecordRepository: AssetRecordRepository,
  ) { }

  @get('/asset-records/{id}/asset-type', {
    responses: {
      '200': {
        description: 'AssetType belonging to AssetRecord',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AssetType)},
          },
        },
      },
    },
  })
  async getAssetType(
    @param.path.number('id') id: typeof AssetRecord.prototype.id,
  ): Promise<AssetType> {
    return this.assetRecordRepository.assetType(id);
  }
}
