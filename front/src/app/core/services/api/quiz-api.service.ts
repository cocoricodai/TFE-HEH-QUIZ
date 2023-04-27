import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { QuizState } from '../../constants/quiz-state.constants.enum';
import { Quiz } from '../../models/quiz.model';
import { Count, ResponseApi } from '../../models/response-api.model';
import { QuizArrayResponse } from '../../models/response/quiz/quiz-array-response.model';
import { QuizObjectResponse } from '../../models/response/quiz/quiz-object-response.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';

@Injectable({
	providedIn: 'root',
})
export class QuizApiService {
	private get quizUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.QUIZ
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllQuiz(params?: HttpParams): Observable<Quiz[]> {
		return this._http
			.get(this.quizUrl, {
				params,
			})
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, QuizArrayResponse)!.data;
				})
			);
	}

	public getOneQuiz(id: number): Observable<Quiz> {
		return this._http.get(this.quizUrl + '/' + id).pipe(
			map((res) => {
				return TypedJSON.parse(res, QuizObjectResponse)!.data;
			})
		);
	}

	public getQuizCount(): Observable<Count> {
		return this._http.get(this.quizUrl + ApiConstants.QuizEndpoint.COUNT).pipe(
			map((res) => {
				return TypedJSON.parse(res, ResponseApi)?.data as Count;
			})
		);
	}

	public getOwnQuiz(state: QuizState): Observable<Quiz[]> {
		return this._http
			.get(this.quizUrl + ApiConstants.QuizEndpoint.ME + '/status/' + state)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, QuizArrayResponse)!.data;
				})
			);
	}

	public getOneOwnQuiz(id: number): Observable<Quiz> {
		return this._http
			.get(this.quizUrl + ApiConstants.QuizEndpoint.ME + '/' + id)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, QuizObjectResponse)!.data;
				})
			);
	}

	public createOneQuiz(payload: Quiz) {
		return this._http.post(this.quizUrl, payload);
	}

	public deleteOneQuiz(id: number) {
		return this._http.delete(this.quizUrl + '/' + id);
	}

	public likeOneQuiz(id: number) {
		return this._http.post(this.quizUrl + '/' + id + '/like', null);
	}

	public unlikeOneQuiz(id: number) {
		return this._http.delete(this.quizUrl + '/' + id + '/unlike');
	}
}
