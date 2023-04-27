import { jsonArrayMember, jsonObject } from 'typedjson';
import { Block } from '../../response-api.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class BlockArrayResponse extends BaseResponse {
	@jsonArrayMember(Block)
	data!: Block[];
}
