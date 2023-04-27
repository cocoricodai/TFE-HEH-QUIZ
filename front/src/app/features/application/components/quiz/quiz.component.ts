import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { FunctionUtils } from 'src/app/core/utils/function.utils';

@Component({
	selector: 'feature-quiz',
	templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
	// Public properties
	public currentStep = 1;
	public quiz!: Quiz;
	public score = 0;
	public currentQuestion = 0;
	public isLastQuestion = false;

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this._quizApiService.getOneQuiz(+params['id']).subscribe({
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

	public endQuiz(): void {
		this.currentStep = 3;
	}

	// Inner works
	private addPoints(selectedAnswer: string): void {
		if (
			selectedAnswer === this.quiz.questions[this.currentQuestion].correctAnswer
		) {
			this.score += this.quiz.questions[this.currentQuestion].points;
		}
	}

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
