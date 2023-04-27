import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'quiz-card',
	templateUrl: './quiz-card.component.html',
	styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent {
	// Inputs
	@Input()
	public quiz!: Quiz;

	// Lifecycle
	constructor(private _router: Router) {}

	// Events
	public onSelectQuiz(): void {
		this._router.navigateByUrl(`/quiz/${this.quiz.id}`);
	}

	// Calculated properties
	public isTeacher(): boolean {
		return this.quiz.profile?.role?.name == RoleConstants.TEACHER;
	}
}
