import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuizState } from 'src/app/core/constants/quiz-state.constants.enum';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { TargetLoadingDirective } from 'src/app/shared/loading/directives/target-loading.directive';

@UntilDestroy()
@Component({
	selector: 'feature-private',
	templateUrl: './private.component.html',
})
export class PrivateComponent implements OnInit {
	@ViewChild('loading', { static: true })
	private _loading!: TargetLoadingDirective;

	// Public properties
	public quizs!: Quiz[];

	// Lifecycle
	constructor(private _quizApiService: QuizApiService) {}

	ngOnInit(): void {
		this._loading.startLoading();
		this._quizApiService
			.getOwnQuiz(QuizState.PRIVATE)
			.pipe(untilDestroyed(this))
			.subscribe((quizs) => {
				this._loading.stopLoading();
				this.quizs = quizs;
			});
	}
}
