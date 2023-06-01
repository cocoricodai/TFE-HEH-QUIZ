import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
class Stats {
	@jsonMember(Number)
	public question_id!: number;

	@jsonMember(Number)
	public correct!: number;

	constructor(fields: { question_id: number; correct: number }) {
		Object.assign(this, fields);
	}
}

@jsonObject
class StatsObject {
	@jsonArrayMember(Stats)
	public stats!: Stats[];

	@jsonMember(Number)
	public count!: number;

	constructor(fields: { stats: Stats[]; count: number }) {
		Object.assign(this, fields);
	}
}

@jsonObject
export class StatsObjectResponse extends BaseResponse {
	@jsonMember(StatsObject)
	data!: StatsObject;
}
