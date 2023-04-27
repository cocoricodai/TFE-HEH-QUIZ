import { jsonMember, jsonObject } from 'typedjson';
import { Quiz } from '../../quiz.model';
import { BaseResponse } from '../base-response/base-response.model';

@jsonObject
export class QuizObjectResponse extends BaseResponse {
	@jsonMember(Quiz)
	data!: Quiz;
}
