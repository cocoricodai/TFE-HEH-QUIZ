import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { UserApiService } from 'src/app/core/services/api/user-api.service';
import { ChartPieValues } from 'src/app/shared/chart/models/chart-pie-values.interface';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-default-view',
	templateUrl: './dashboard-default-view.component.html',
})
export class DashboardDefaultViewComponent implements OnInit {
	// Public properties
	public usersCount!: ChartPieValues;
	public totalUsers = 0;
	public totalQuiz!: number;

	public userCountIsLoading = true;

	// Lifecycle
	constructor(
		private _userApiService: UserApiService,
		private _quizApiService: QuizApiService
	) {}

	ngOnInit(): void {
		this._userApiService
			.getUsersCount()
			.pipe(
				untilDestroyed(this),
				map((el) => {
					el.map((e) => {
						this.totalUsers += e.count;
					});

					return el;
				})
			)
			.subscribe({
				next: (el) => {
					const datas: number[] = [];
					const labels: string[] = [];
					el.map((e) => {
						datas.push(e.count);
						labels.push(e.role.name);
					});

					this.usersCount = {
						datas: datas,
						labels: labels,
					};
				},
			});

		this._quizApiService
			.getQuizCount()
			.pipe(untilDestroyed(this))
			.subscribe((quiz) => (this.totalQuiz = quiz.count));
	}
}
