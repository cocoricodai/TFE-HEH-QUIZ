import { jsonMember, jsonObject } from 'typedjson';
import { Campus } from '../../response-api.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class CampusObjectResponse extends BaseResponse {
	@jsonMember(Campus)
	data!: Campus;
}
