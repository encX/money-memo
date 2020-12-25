import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  AssetType,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAssetTypeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/asset-types', {
    responses: {
      '200': {
        description: 'Array of User has many AssetType',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AssetType)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AssetType>,
  ): Promise<AssetType[]> {
    return this.userRepository.assetTypes(id).find(filter);
  }

  @post('/users/{id}/asset-types', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssetType)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetType, {
            title: 'NewAssetTypeInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) assetType: Omit<AssetType, 'id'>,
  ): Promise<AssetType> {
    return this.userRepository.assetTypes(id).create(assetType);
  }

  @patch('/users/{id}/asset-types', {
    responses: {
      '200': {
        description: 'User.AssetType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetType, {partial: true}),
        },
      },
    })
    assetType: Partial<AssetType>,
    @param.query.object('where', getWhereSchemaFor(AssetType)) where?: Where<AssetType>,
  ): Promise<Count> {
    return this.userRepository.assetTypes(id).patch(assetType, where);
  }

  @del('/users/{id}/asset-types', {
    responses: {
      '200': {
        description: 'User.AssetType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AssetType)) where?: Where<AssetType>,
  ): Promise<Count> {
    return this.userRepository.assetTypes(id).delete(where);
  }
}
