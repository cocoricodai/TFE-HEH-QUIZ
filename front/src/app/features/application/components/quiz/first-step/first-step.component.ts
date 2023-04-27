import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

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
		private _quizApiService: QuizApiService
	) {}

	public clickOnHeart() {
		this.quiz.likes.isLiked = !this.quiz.likes.isLiked;

		if (this.quiz.likes.isLiked) {
			this.quiz.likes.count += 1;
			this._quizApiService.likeOneQuiz(this.quiz.id).subscribe({
				error: () => {
					this.quiz.likes.isLiked = false;
					this.quiz.likes.count -= 1;
				},
			});
		} else {
			this.quiz.likes.count -= 1;
			this._quizApiService.unlikeOneQuiz(this.quiz.id).subscribe({
				error: () => {
					this.quiz.likes.isLiked = true;
					this.quiz.likes.count += 1;
				},
			});
		}
	}

	public navigateOnProfile() {
		this._router.navigateByUrl(`/profile/${this.quiz.userId}`);
	}

	public onStartQuiz(): void {
		this.startQuiz.emit(true);
	}
}
