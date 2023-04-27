import { jsonMember, jsonObject } from 'typedjson';
import { Block } from '../../response-api.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class BlockObjectResponse extends BaseResponse {
	@jsonMember(Block)
	data!: Block;
}
