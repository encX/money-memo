import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AssetType,
  User,
} from '../models';
import {AssetTypeRepository} from '../repositories';

export class AssetTypeUserController {
  constructor(
    @repository(AssetTypeRepository)
    public assetTypeRepository: AssetTypeRepository,
  ) { }

  @get('/asset-types/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to AssetType',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof AssetType.prototype.id,
  ): Promise<User> {
    return this.assetTypeRepository.user(id);
  }
}
