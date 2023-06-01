import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class Result {
	@jsonMember(Number)
	public id!: number;

	@jsonMember(Number)
	public quiz_id!: number;

	@jsonMember(String)
	public title!: string;

	@jsonMember(Number)
	public score!: number;

	@jsonMember(Number)
	public total!: number;

	@jsonMember(Date)
	public createdAt!: Date;

	constructor(fields: {
		id: number;
		quiz_id: number;
		title: string;
		score: number;
		total: number;
		createdAt: Date;
	}) {
		Object.assign(this, fields);
	}
}
