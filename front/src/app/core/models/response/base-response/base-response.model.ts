import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export abstract class BaseResponse {
	@jsonMember(Boolean)
	public success!: boolean;

	@jsonMember(String)
	public message?: string;
}
