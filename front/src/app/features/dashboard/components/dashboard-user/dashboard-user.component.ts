import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/core/models/response-api.model';
import { UserApiService } from 'src/app/core/services/api/user-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-user',
	templateUrl: './dashboard-user.component.html',
})
export class DashboardUserComponent implements OnInit {
	// Public properties
	public users: User[] = [];

	// Lifecycle
	constructor(private _userApiService: UserApiService) {}

	ngOnInit(): void {
		let params = new HttpParams().append('exclude', 'token');

		this._userApiService
			.getAllUsers(params)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (users) => (this.users = users),
			});
	}
}
