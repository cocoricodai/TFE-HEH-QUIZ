import { jsonArrayMember, jsonObject } from 'typedjson';
import { Quiz } from '../../quiz.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class QuizArrayResponse extends BaseResponse {
	@jsonArrayMember(Quiz)
	data!: Quiz[];
}
