import { jsonArrayMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';
import { SectionBlock } from '../../section-block.model';

@jsonObject
export class SectionBlockArrayResponse extends BaseResponse {
	@jsonArrayMember(SectionBlock)
	data!: SectionBlock[];
}
