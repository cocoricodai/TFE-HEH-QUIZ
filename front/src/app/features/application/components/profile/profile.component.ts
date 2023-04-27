import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/core/services/api/user-api.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _userApiService: UserApiService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this._userApiService.getUserByPk(params['id']).subscribe({
				next: (user) => {
					console.log(user);
				},
			});
		});
	}
}
