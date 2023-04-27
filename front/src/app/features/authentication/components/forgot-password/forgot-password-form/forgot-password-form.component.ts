import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationApiService } from 'src/app/core/services/api/authentication-api.service';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';
@Component({
	selector: 'forgot-password-form',
	templateUrl: './forgot-password-form.component.html',
	styleUrls: ['../../form.css'],
})
export class ForgotPasswordFormComponent implements OnInit {
	// Public properties
	public forgotPasswordForm!: FormGroup;

	// Lifecycle
	constructor(
		private _authenticationApiService: AuthenticationApiService,
		private _router: Router,
		private _toastr: ToastrService,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this.setupForm();
	}

	// Inner works
	private setupForm(): void {
		this.forgotPasswordForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
		});
	}

	// Events
	public forgotPassword(): void {
		this._loadingService.startLoading();
		const payload: { email: string } = this.forgotPasswordForm.value;
		this._authenticationApiService
			.forgotPassword(payload)
			.pipe(finalize(() => this._loadingService.stopLoading()))
			.subscribe({
				next: () => {
					this._toastr.info('Go look your mail');
					this._router.navigate(['/auth/login']);
				},
				error: (err) => {
					this._toastr.error(err.error.message);
				},
				complete: () => console.log('Forgot password finit'),
			});
	}
}
