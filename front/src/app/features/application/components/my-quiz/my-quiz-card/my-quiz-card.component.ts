import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'feature-quiz-card',
	templateUrl: './my-quiz-card.component.html',
})
export class MyQuizCardComponent {
	@Input()
	public quiz!: Quiz;

	// Lifecycle
	constructor(private _router: Router) {}

	// Events
	public onSelectQuiz(quiz: Quiz): void {
		this._router.navigateByUrl('/my-quiz/' + quiz.id);
	}
}
