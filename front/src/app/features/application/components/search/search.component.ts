import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, debounceTime } from 'rxjs';
import { Quiz } from 'src/app/core/models/quiz.model';
import { User } from 'src/app/core/models/response-api.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { UserApiService } from 'src/app/core/services/api/user-api.service';

@UntilDestroy()
@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
	public searchSubject: Subject<string> = new Subject<string>();
	public isSearchFocused: boolean = false;
	public selectedOption: 'user' | 'quiz' = 'quiz';
	public quizs!: Quiz[];
	public users!: User[];

	@Output()
	public onNavigate = new EventEmitter<void>();

	// Lifecycle
	constructor(
		private _quizApiService: QuizApiService,
		private _userApiService: UserApiService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.searchSubject.pipe(debounceTime(500)).subscribe((searchValue) => {
			this.search(searchValue);
		});
	}

	// Inner
	private search(event: string) {
		if (this.selectedOption === 'quiz') {
			const param = new HttpParams().append('title', event);
			this._quizApiService
				.getAllQuiz(param)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (quizs) => {
						this.quizs = quizs;
					},
				});
		} else {
			const param = new HttpParams().append('email', event);
			this._userApiService
				.getAllUsers(param)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (users) => {
						this.users = users;
					},
				});
		}
	}

	// public
	public onInputChange(event: any) {
		const searchValue: string = event.target.value;
		this.searchSubject.next(searchValue);
	}

	public navigate(url: string, id: any) {
		this.onNavigate.emit();
		this._router.navigateByUrl(`/${url}/${id}`);
	}
}
