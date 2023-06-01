import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class SectionBlock {
	@jsonMember(Number)
	public id!: number;

	@jsonMember(Number)
	public section_id!: number;

	@jsonMember(Number)
	public block_id!: number;

	constructor(fields: { id: number; section_id: number; block_id: number }) {
		Object.assign(this, fields);
	}
}
