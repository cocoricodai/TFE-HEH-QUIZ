import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LocalStorageConstants } from 'src/app/core/constants/local-storage.constants';
import { AuthenticationApiService } from 'src/app/core/services/api/authentication-api.service';
import { LocalStorageManagerService } from 'src/app/core/services/local-storage/local-storage-manager.service';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';
@Component({
	selector: 'login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['../../form.css'],
})
export class LoginFormComponent implements OnInit {
	// Public properties
	public loginForm!: FormGroup;

	// Lifecycle
	constructor(
		private _authenticationApiService: AuthenticationApiService,
		private _router: Router,
		private _toastr: ToastrService,
		private _localStorageManagerService: LocalStorageManagerService,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this.setupForm();
	}

	// Inner works
	private setupForm(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required]),
		});
	}

	// Events
	public login(): void {
		this._loadingService.startLoading();
		const payload: { email: string; password: string } = this.loginForm.value;
		this._authenticationApiService
			.login(payload)
			.pipe(finalize(() => this._loadingService.stopLoading()))
			.subscribe({
				next: (el) => {
					this._localStorageManagerService.setItemString(
						LocalStorageConstants.Key.TOKEN,
						el.access
					);
					this._router.navigate(['/']);
				},
				error: (err) => {
					this._toastr.error(err.error.message);
				},
				complete: () => console.log('Login finit'),
			});
	}
}
