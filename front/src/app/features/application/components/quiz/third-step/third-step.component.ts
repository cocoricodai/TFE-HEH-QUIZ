import { Component, Input } from '@angular/core';
import { AnswerQuiz } from 'src/app/core/models/answer-quiz.interface';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'quiz-third-step',
	templateUrl: './third-step.component.html',
})
export class QuizthirdStepComponent {
	// Inputs
	@Input()
	public quiz!: Quiz;

	@Input()
	public score!: number;

	@Input()
	public answers!: AnswerQuiz[];
}
