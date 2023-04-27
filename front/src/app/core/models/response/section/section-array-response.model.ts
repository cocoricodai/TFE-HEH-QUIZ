import { jsonArrayMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';
import { Section } from '../../response-api.model';

@jsonObject
export class SectionArrayResponse extends BaseResponse {
	@jsonArrayMember(Section)
	data!: Section[];
}
