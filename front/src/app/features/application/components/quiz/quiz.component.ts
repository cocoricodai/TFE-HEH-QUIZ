import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { AnswerQuiz } from 'src/app/core/models/answer-quiz.interface';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { FunctionUtils } from 'src/app/core/utils/function.utils';

@UntilDestroy()
@Component({
	selector: 'feature-quiz',
	templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
	// Public properties
	public currentStep = 1;
	public quiz!: Quiz;
	public score = 0;
	public answers!: AnswerQuiz[];

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _route: ActivatedRoute,
		private _toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this._quizApiService
				.getOneQuiz(+params['id'])
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (quiz) => {
						this.quiz = quiz;
						this.shuffleQuestions();
					},
				});
		});
	}

	// Events

	public startQuiz(): void {
		this.currentStep = 2;
	}

	public endQuiz(value: { score: number; responses: AnswerQuiz[] }): void {
		this._quizApiService
			.createResult(this.quiz.id, value.responses)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: () => this._toastrService.success('Result created'),
			});
		this.answers = value.responses;
		this.score = value.score;
		this.currentStep = 3;
	}

	// Inner works
	private shuffleQuestions(): void {
		// Shuffle questions array
		this.quiz.questions = FunctionUtils.shuffleArray<Question>(
			this.quiz.questions
		);

		// Shuffle choices array
		this.quiz.questions.forEach((question, index) => {
			this.quiz.questions[index].choices = FunctionUtils.shuffleArray<string>(
				question.choices
			);
		});
	}
}
