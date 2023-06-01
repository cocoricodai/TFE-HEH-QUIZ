import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Block, Campus, Section } from 'src/app/core/models/response-api.model';
import { AuthenticationApiService } from 'src/app/core/services/api/authentication-api.service';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { CampusApiService } from 'src/app/core/services/api/campus-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';

@UntilDestroy()
@Component({
	selector: 'register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['../../form.css'],
})
export class RegisterFormComponent implements OnInit {
	// Public properties
	public registerForm!: FormGroup;

	public isTeacher: boolean = false;

	public campusList!: Campus[];
	public sections!: Section[];
	public blocks!: Block[];

	// Lifecycle
	constructor(
		private _authenticationApiService: AuthenticationApiService,
		private _campusApiService: CampusApiService,
		private _sectionApiService: SectionApiService,
		private _blockApiService: BlockApiService,
		private _router: Router,
		private _toastr: ToastrService,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this._campusApiService
			.getAllCampus()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (campus) => {
					this.campusList = campus;
				},
			});

		this.setupForm();
	}

	// Inner works
	private setupForm(): void {
		this.registerForm = new FormGroup(
			{
				email: new FormControl('', [
					Validators.pattern(/^(?=.*[a-zA-Z]+\.[a-zA-Z]+@(?:std\.)?heh\.be$)/),
					Validators.required,
				]),
				password: new FormControl('', [
					Validators.pattern(
						/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%.])\S{7,15}$/
					),
					Validators.required,
				]),
				passwordConfirmation: new FormControl('', [Validators.required]),
				campus_id: new FormControl('', [Validators.required]),
				section_id: new FormControl(''),
				block_id: new FormControl(''),
			},
			[this.passwordMatch('password', 'passwordConfirmation')]
		);

		this.registerForm.get('email')?.valueChanges.subscribe((email) => {
			if (/^[a-zA-Z]+.[a-zA-Z]+@heh.be$/i.test(email)) {
				this.isTeacher = true;
				this.registerForm
					.get('section_id')
					?.removeValidators(Validators.required);
				this.registerForm
					.get('block_id')
					?.removeValidators(Validators.required);
			} else {
				this.isTeacher = false;
				this.registerForm.get('section_id')?.addValidators(Validators.required);
				this.registerForm.get('block_id')?.addValidators(Validators.required);
			}
		});
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

	// Events
	public onSelectCampus(event: any): void {
		const campus_id: number = event.value;
		this._sectionApiService
			.getSectionsByCampus(campus_id)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (sections) => {
					this.sections = sections;
				},
			});
	}

	public onSelectSection(event: any): void {
		const section_id: number = event.value;
		this._blockApiService
			.getBlocksBySection(section_id)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (blocks) => {
					this.blocks = blocks;
				},
			});
	}

	public register(): void {
		this._loadingService.startLoading();
		const payload = this.registerForm.value;
		this._authenticationApiService
			.register(payload)
			.pipe(
				untilDestroyed(this),
				finalize(() => this._loadingService.stopLoading())
			)
			.subscribe({
				next: (res) => {
					this._toastr.success(res?.message);
					this._router.navigate(['/auth/login']);
				},
				error: (err) => {
					this._toastr.error(err.error.message);
				},
				complete: () => console.log('Register finit'),
			});
	}
}
