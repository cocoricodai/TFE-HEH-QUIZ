import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

@UntilDestroy()
@Component({
	selector: 'quiz-first-step',
	templateUrl: './first-step.component.html',
})
export class QuizFirstStepComponent {
	// Inputs & Outputs
	@Input()
	public quiz!: Quiz;

	@Output()
	public startQuiz = new EventEmitter<boolean>();

	// Lifecycle
	constructor(
		private _router: Router,
		private _quizApiService: QuizApiService,
		private _toastrService: ToastrService
	) {}

	public clickOnHeart() {
		this.quiz.likes.isLiked = !this.quiz.likes.isLiked;

		if (this.quiz.likes.isLiked) {
			this.quiz.likes.count += 1;
			this._quizApiService
				.likeOneQuiz(this.quiz.id)
				.pipe(untilDestroyed(this))
				.subscribe({
					error: () => {
						this.quiz.likes.isLiked = false;
						this.quiz.likes.count -= 1;
					},
				});
		} else {
			this.quiz.likes.count -= 1;
			this._quizApiService
				.unlikeOneQuiz(this.quiz.id)
				.pipe(untilDestroyed(this))
				.subscribe({
					error: () => {
						this.quiz.likes.isLiked = true;
						this.quiz.likes.count += 1;
					},
				});
		}
	}

	public onReportQuiz() {
		this._quizApiService
			.reportOneQuiz(this.quiz.id)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: () => this._toastrService.success('Report send !'),
				error: (err) => {
					this._toastrService.error(err.error.message);
				},
			});
	}

	public navigateOnProfile() {
		this._router.navigateByUrl(`/profile/${this.quiz.userId}`);
	}

	public onStartQuiz(): void {
		this.startQuiz.emit(true);
	}
}
