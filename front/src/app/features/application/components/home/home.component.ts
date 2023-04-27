import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiQueryConstant } from 'src/app/core/constants/api.query.constant';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { Quiz } from 'src/app/core/models/quiz.model';
import { UserModel } from 'src/app/core/models/user.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { UserService } from 'src/app/core/services/user.service';
import { TargetLoadingDirective } from 'src/app/shared/loading/directives/target-loading.directive';

@Component({
	selector: 'feature-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	// ViewChild
	@ViewChild('latestQuiz', { static: true })
	private _latestQuizLoader!: TargetLoadingDirective;

	@ViewChild('likedQuiz', { static: true })
	private _likedQuizLoader!: TargetLoadingDirective;

	// Public properties
	public user!: UserModel;
	public isTeacher: boolean = false;

	public latestQuizs!: Quiz[];
	public likedQuizs!: Quiz[];

	public isLoading = false;

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _userService: UserService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.user = this._userService.getUser;

		this.user.profile.role.name === RoleConstants.TEACHER
			? (this.isTeacher = true)
			: (this.isTeacher = false);

		this._latestQuizLoader.startLoading();
		this._likedQuizLoader.startLoading();

		this._quizApiService.getAllQuiz().subscribe({
			next: (latestQuizs) => {
				this._latestQuizLoader.stopLoading();
				this.latestQuizs = latestQuizs;
			},
		});

		const likedParams = new HttpParams().append(
			ApiQueryConstant.Key.SORT_BY,
			'likes'
		);
		this._quizApiService.getAllQuiz(likedParams).subscribe({
			next: (likedQuizs) => {
				this._likedQuizLoader.stopLoading();
				this.likedQuizs = likedQuizs;
			},
		});
	}

	// Events
	public onSelectQuiz(quiz: Quiz): void {
		this._router.navigateByUrl(`/quiz/${quiz.id}`);
	}
}
