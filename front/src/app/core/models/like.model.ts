import { jsonMember, jsonObject } from 'typedjson';
@jsonObject
export class Like {
	@jsonMember(Number)
	public count!: number;

	@jsonMember(Boolean)
	public isLiked?: boolean;

	constructor(fields: { count: number; isLiked?: boolean }) {
		Object.assign(this, fields);
	}
}
