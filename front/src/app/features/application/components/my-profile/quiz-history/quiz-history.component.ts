import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Result } from 'src/app/core/models/result.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-quiz-history',
	templateUrl: './quiz-history.component.html',
})
export class QuizHistoryComponent implements OnInit {
	// Public properties
	public results!: Result[];

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._quizApiService
			.getOwnResults()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (results) => {
					this.results = results;
				},
			});
	}

	// Events
	public navigateOnQuiz(id: number) {
		this._router.navigateByUrl(`/quiz/${id}`);
	}
}
