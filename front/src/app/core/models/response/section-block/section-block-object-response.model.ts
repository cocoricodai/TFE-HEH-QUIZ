import { jsonMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';
import { SectionBlock } from '../../section-block.model';

@jsonObject
export class SectionBlockObjectResponse extends BaseResponse {
	@jsonMember(SectionBlock)
	data!: SectionBlock;
}
