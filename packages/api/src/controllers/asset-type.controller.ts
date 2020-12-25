import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {AssetType} from '../models';
import {AssetTypeRepository} from '../repositories';

export class AssetTypeController {
  constructor(
    @repository(AssetTypeRepository)
    public assetTypeRepository : AssetTypeRepository,
  ) {}

  @post('/asset-types', {
    responses: {
      '200': {
        description: 'AssetType model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssetType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetType, {
            title: 'NewAssetType',
            exclude: ['id'],
          }),
        },
      },
    })
    assetType: Omit<AssetType, 'id'>,
  ): Promise<AssetType> {
    return this.assetTypeRepository.create(assetType);
  }

  @get('/asset-types/count', {
    responses: {
      '200': {
        description: 'AssetType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AssetType) where?: Where<AssetType>,
  ): Promise<Count> {
    return this.assetTypeRepository.count(where);
  }

  @get('/asset-types', {
    responses: {
      '200': {
        description: 'Array of AssetType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AssetType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AssetType) filter?: Filter<AssetType>,
  ): Promise<AssetType[]> {
    return this.assetTypeRepository.find(filter);
  }

  @patch('/asset-types', {
    responses: {
      '200': {
        description: 'AssetType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetType, {partial: true}),
        },
      },
    })
    assetType: AssetType,
    @param.where(AssetType) where?: Where<AssetType>,
  ): Promise<Count> {
    return this.assetTypeRepository.updateAll(assetType, where);
  }

  @get('/asset-types/{id}', {
    responses: {
      '200': {
        description: 'AssetType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AssetType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AssetType, {exclude: 'where'}) filter?: FilterExcludingWhere<AssetType>
  ): Promise<AssetType> {
    return this.assetTypeRepository.findById(id, filter);
  }

  @patch('/asset-types/{id}', {
    responses: {
      '204': {
        description: 'AssetType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetType, {partial: true}),
        },
      },
    })
    assetType: AssetType,
  ): Promise<void> {
    await this.assetTypeRepository.updateById(id, assetType);
  }

  @put('/asset-types/{id}', {
    responses: {
      '204': {
        description: 'AssetType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assetType: AssetType,
  ): Promise<void> {
    await this.assetTypeRepository.replaceById(id, assetType);
  }

  @del('/asset-types/{id}', {
    responses: {
      '204': {
        description: 'AssetType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assetTypeRepository.deleteById(id);
  }
}
