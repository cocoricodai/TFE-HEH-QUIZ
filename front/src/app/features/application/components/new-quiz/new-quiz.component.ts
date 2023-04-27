import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

@Component({
	selector: 'feature-new-quiz',
	templateUrl: './new-quiz.component.html',
	styleUrls: ['./new-quiz.component.css'],
})
export class NewQuizComponent {
	// Public properties
	public currentStep: number = 1;
	public quiz!: Quiz;

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _router: Router,
		private _toastrService: ToastrService
	) {}

	// Events
	public firstStepForm(quiz: Quiz) {
		this.currentStep++;
		this.quiz = quiz;
	}

	public secondStepForm(questions: Question[]) {
		this.quiz.questions = questions;

		this._quizApiService.createOneQuiz(this.quiz).subscribe({
			next: (el) => {
				this._toastrService.success('All ok');
				this._router.navigateByUrl('/');
			},
			error: (err) => this._toastrService.error(err),
		});
	}
}
