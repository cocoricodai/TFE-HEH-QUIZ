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
import { ResultArrayResponse } from '../../models/response/quiz/result-array-response.model';
import { Result } from '../../models/result.model';
import { AnswerQuiz } from '../../models/answer-quiz.interface';
import { QuizStats } from '../../models/quiz-stats.model';
import { StatsObjectResponse } from '../../models/response/quiz/stats-object-response.model';

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

	public getQuizDoneCount(): Observable<Count> {
		return this._http
			.get(this.quizUrl + '/done' + ApiConstants.QuizEndpoint.COUNT)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi)?.data as Count;
				})
			);
	}

	public getQuizDoneStats(): Observable<QuizStats[]> {
		return this._http.get(this.quizUrl + '/done/stats').pipe(
			map((res) => {
				return TypedJSON.parse(res, ResponseApi)?.data as QuizStats[];
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

	public modifyOneOneQuiz(id: number, payload: Quiz) {
		return this._http.patch(
			this.quizUrl + ApiConstants.QuizEndpoint.ME + '/' + id,
			payload
		);
	}

	public deleteOneOwnQuiz(id: number) {
		return this._http.delete(
			this.quizUrl + ApiConstants.QuizEndpoint.ME + '/' + id
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

	public reportOneQuiz(id: number) {
		return this._http.post(this.quizUrl + '/' + id + '/report', null);
	}

	public createResult(id: number, answers: AnswerQuiz[]) {
		return this._http.post(this.quizUrl + '/' + id + '/result', answers);
	}

	public getOwnResults(): Observable<Result[]> {
		return this._http
			.get(this.quizUrl + ApiConstants.QuizEndpoint.ME + '/results')
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResultArrayResponse)!.data;
				})
			);
	}

	public getResultsFromId(id: string): Observable<Result[]> {
		return this._http.get(this.quizUrl + '/' + id + '/results').pipe(
			map((res) => {
				return TypedJSON.parse(res, ResultArrayResponse)!.data;
			})
		);
	}

	public getOwnStatsFromId(id: number) {
		return this._http
			.get(this.quizUrl + ApiConstants.QuizEndpoint.ME + '/' + id + '/stats')
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, StatsObjectResponse)!.data;
				})
			);
	}
}
