import { jsonArrayMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';
import { Result } from '../../result.model';

@jsonObject
export class ResultArrayResponse extends BaseResponse {
	@jsonArrayMember(Result)
	data!: Result[];
}
