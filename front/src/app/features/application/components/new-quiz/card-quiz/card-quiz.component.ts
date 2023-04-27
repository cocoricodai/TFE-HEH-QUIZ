import { Component, Input } from '@angular/core';
import { Question } from 'src/app/core/models/question.model';

@Component({
	selector: 'new-quiz-card',
	templateUrl: './card-quiz.component.html',
})
export class NewQuizCardComponent {
	// Inputs
	@Input()
	public question!: Question;
}
