import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
@jsonObject
export class Question {
	@jsonMember(Number)
	public id?: number;

	@jsonMember(String)
	public title!: string;

	@jsonMember(String)
	public image!: string | null;

	@jsonArrayMember(String)
	public choices!: string[];

	@jsonMember(String)
	public correctAnswer!: string;

	@jsonMember(Number)
	public points!: number;

	constructor(fields: {
		id?: number;
		title: string;
		image: string | null;
		choices: string[];
		correctAnswer: string;
		points: number;
	}) {
		Object.assign(this, fields);
	}
}
