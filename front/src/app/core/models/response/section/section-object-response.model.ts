import { jsonMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';
import { Section } from '../../response-api.model';

@jsonObject
export class SectionObjectResponse extends BaseResponse {
	@jsonMember(Section)
	data!: Section;
}
