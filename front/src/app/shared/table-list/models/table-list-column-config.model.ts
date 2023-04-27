import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class TableListColumnConfig {
	@jsonMember(String)
	public headerName!: string;

	constructor(fields: { headerName: string }) {
		Object.assign(this, fields);
	}
}
