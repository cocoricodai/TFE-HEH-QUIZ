import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin } from 'rxjs';
import { Quiz } from 'src/app/core/models/quiz.model';
import { Result } from 'src/app/core/models/result.model';
import { UserModel } from 'src/app/core/models/user.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { UserApiService } from 'src/app/core/services/api/user-api.service';

@UntilDestroy()
@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
	// Properties
	public user!: UserModel;
	public quizs!: Quiz[];
	public results!: Result[];

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _userApiService: UserApiService,
		private _quizApiService: QuizApiService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			const httpParams = new HttpParams().append('user_id', params['id']);

			forkJoin(
				this._userApiService.getUserByPk(params['id']),
				this._quizApiService.getAllQuiz(httpParams),
				this._quizApiService.getResultsFromId(params['id'])
			)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: ([user, quizs, results]) => {
						this.user = user;
						this.quizs = quizs;
						this.results = results;
					},
					error: () => {
						this._router.navigateByUrl('/');
					},
				});
		});
	}

	// Events
	public navigateOnQuiz(id: number) {
		this._router.navigateByUrl(`/quiz/${id}`);
	}
}
