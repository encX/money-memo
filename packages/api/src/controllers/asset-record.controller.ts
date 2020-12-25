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
import {AssetRecord} from '../models';
import {AssetRecordRepository} from '../repositories';

export class AssetRecordController {
  constructor(
    @repository(AssetRecordRepository)
    public assetRecordRepository : AssetRecordRepository,
  ) {}

  @post('/asset-records', {
    responses: {
      '200': {
        description: 'AssetRecord model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssetRecord)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetRecord, {
            title: 'NewAssetRecord',
            exclude: ['id'],
          }),
        },
      },
    })
    assetRecord: Omit<AssetRecord, 'id'>,
  ): Promise<AssetRecord> {
    return this.assetRecordRepository.create(assetRecord);
  }

  @get('/asset-records/count', {
    responses: {
      '200': {
        description: 'AssetRecord model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AssetRecord) where?: Where<AssetRecord>,
  ): Promise<Count> {
    return this.assetRecordRepository.count(where);
  }

  @get('/asset-records', {
    responses: {
      '200': {
        description: 'Array of AssetRecord model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AssetRecord, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AssetRecord) filter?: Filter<AssetRecord>,
  ): Promise<AssetRecord[]> {
    return this.assetRecordRepository.find(filter);
  }

  @patch('/asset-records', {
    responses: {
      '200': {
        description: 'AssetRecord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetRecord, {partial: true}),
        },
      },
    })
    assetRecord: AssetRecord,
    @param.where(AssetRecord) where?: Where<AssetRecord>,
  ): Promise<Count> {
    return this.assetRecordRepository.updateAll(assetRecord, where);
  }

  @get('/asset-records/{id}', {
    responses: {
      '200': {
        description: 'AssetRecord model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AssetRecord, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AssetRecord, {exclude: 'where'}) filter?: FilterExcludingWhere<AssetRecord>
  ): Promise<AssetRecord> {
    return this.assetRecordRepository.findById(id, filter);
  }

  @patch('/asset-records/{id}', {
    responses: {
      '204': {
        description: 'AssetRecord PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetRecord, {partial: true}),
        },
      },
    })
    assetRecord: AssetRecord,
  ): Promise<void> {
    await this.assetRecordRepository.updateById(id, assetRecord);
  }

  @put('/asset-records/{id}', {
    responses: {
      '204': {
        description: 'AssetRecord PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assetRecord: AssetRecord,
  ): Promise<void> {
    await this.assetRecordRepository.replaceById(id, assetRecord);
  }

  @del('/asset-records/{id}', {
    responses: {
      '204': {
        description: 'AssetRecord DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assetRecordRepository.deleteById(id);
  }
}
