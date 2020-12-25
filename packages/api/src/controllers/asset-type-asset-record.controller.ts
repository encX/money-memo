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
  AssetType,
  AssetRecord,
} from '../models';
import {AssetTypeRepository} from '../repositories';

export class AssetTypeAssetRecordController {
  constructor(
    @repository(AssetTypeRepository) protected assetTypeRepository: AssetTypeRepository,
  ) { }

  @get('/asset-types/{id}/asset-record', {
    responses: {
      '200': {
        description: 'AssetType has one AssetRecord',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AssetRecord),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AssetRecord>,
  ): Promise<AssetRecord> {
    return this.assetTypeRepository.assetRecord(id).get(filter);
  }

  @post('/asset-types/{id}/asset-record', {
    responses: {
      '200': {
        description: 'AssetType model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssetRecord)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AssetType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetRecord, {
            title: 'NewAssetRecordInAssetType',
            exclude: ['id'],
            optional: ['assetTypeId']
          }),
        },
      },
    }) assetRecord: Omit<AssetRecord, 'id'>,
  ): Promise<AssetRecord> {
    return this.assetTypeRepository.assetRecord(id).create(assetRecord);
  }

  @patch('/asset-types/{id}/asset-record', {
    responses: {
      '200': {
        description: 'AssetType.AssetRecord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssetRecord, {partial: true}),
        },
      },
    })
    assetRecord: Partial<AssetRecord>,
    @param.query.object('where', getWhereSchemaFor(AssetRecord)) where?: Where<AssetRecord>,
  ): Promise<Count> {
    return this.assetTypeRepository.assetRecord(id).patch(assetRecord, where);
  }

  @del('/asset-types/{id}/asset-record', {
    responses: {
      '200': {
        description: 'AssetType.AssetRecord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AssetRecord)) where?: Where<AssetRecord>,
  ): Promise<Count> {
    return this.assetTypeRepository.assetRecord(id).delete(where);
  }
}
