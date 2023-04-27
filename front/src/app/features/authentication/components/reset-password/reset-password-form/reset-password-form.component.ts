import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthenticationApiService } from 'src/app/core/services/api/authentication-api.service';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';

@Component({
	selector: 'feature-reset-password-form-component',
	templateUrl: './reset-password-form.component.html',
	styleUrls: ['../../form.css'],
})
export class ResetPasswordForm implements OnInit {
	// Public properties
	public resetPasswordForm!: FormGroup;

	// Inner properties
	private _token!: string;

	// Lifecycle
	constructor(
		private _authenticationApiService: AuthenticationApiService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _toastr: ToastrService,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params: Params) => {
			this._token = params['token'];
		});

		this.setupForm();
	}

	// Inner works
	private setupForm(): void {
		this.resetPasswordForm = new FormGroup(
			{
				password: new FormControl('', [
					Validators.pattern(
						/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%.])\S{7,15}$/
					),
					Validators.required,
				]),
				passwordConfirmation: new FormControl(null, [Validators.required]),
			},
			[this.passwordMatch('password', 'passwordConfirmation')]
		);
	}

	private passwordMatch(password: string, passwordConfirmation: string) {
		return function (form: AbstractControl) {
			const passwordValue = form.get(password)?.value;
			const passwordConfirmationValue = form.get(passwordConfirmation)?.value;

			if (passwordValue === passwordConfirmationValue) {
				return null;
			}
			return { passwordMismatchError: true };
		};
	}

	// events
	public resetPassword(): void {
		this._loadingService.startLoading();
		const password: { password: string } = this.resetPasswordForm.value;
		const payload = { ...password, token: this._token };
		this._authenticationApiService
			.resetPassword(payload)
			.pipe(finalize(() => this._loadingService.stopLoading()))
			.subscribe({
				next: () => {
					this._toastr.success('Password changed !');
					this._router.navigate(['/auth/login']);
				},
				error: (err) => {
					this._toastr.error(err.error.message);
				},
				complete: () => console.log('Reset password finit'),
			});
	}
}
