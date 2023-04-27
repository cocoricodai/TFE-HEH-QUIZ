import { jsonArrayMember, jsonObject } from 'typedjson';
import { Campus } from '../../response-api.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class CampusArrayResponse extends BaseResponse {
	@jsonArrayMember(Campus)
	data!: Campus[];
}
