import { jsonMember, jsonObject } from 'typedjson';

@jsonObject()
export class QuizStats {
	@jsonMember(String)
	public date!: string;

	@jsonMember(Number)
	public count!: number;
}
