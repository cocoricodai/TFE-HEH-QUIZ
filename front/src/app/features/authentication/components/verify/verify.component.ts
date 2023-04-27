import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationApiService } from 'src/app/core/services/api/authentication-api.service';
@Component({
	selector: 'feature-verify',
	templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {
	// Public properties
	public isVerify: boolean = false;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _authenticationApiService: AuthenticationApiService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params: Params) => {
			const id = params['id'];
			const token = params['token'];
			this._authenticationApiService.verify({ id, token }).subscribe({
				next: () => (this.isVerify = true),
				error: () => (this.isVerify = false),
			});
		});
	}
}
