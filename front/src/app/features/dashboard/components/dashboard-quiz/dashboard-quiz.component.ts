import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-quiz',
	templateUrl: './dashboard-quiz.component.html',
})
export class DashboardQuizComponent implements OnInit {
	// Public properties
	public quizs: Quiz[] = [];

	// Lifecycle
	constructor(private _quizApiService: QuizApiService) {}

	ngOnInit(): void {
		this._quizApiService
			.getAllQuiz()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (quizs) => (this.quizs = quizs),
			});
	}
}
