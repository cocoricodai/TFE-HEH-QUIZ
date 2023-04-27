import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
@jsonObject
export class Question {
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
		title: string;
		image: string | null;
		choices: string[];
		correctAnswer: string;
		points: number;
	}) {
		Object.assign(this, fields);
	}
}
