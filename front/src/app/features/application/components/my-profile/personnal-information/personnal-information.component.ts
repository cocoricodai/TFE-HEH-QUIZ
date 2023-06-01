import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { concatMap, filter, tap } from 'rxjs';
import { LocalStorageConstants } from 'src/app/core/constants/local-storage.constants';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { Block, Campus, Section } from 'src/app/core/models/response-api.model';
import { UserModel } from 'src/app/core/models/user.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { CampusApiService } from 'src/app/core/services/api/campus-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { UserApiService } from 'src/app/core/services/api/user-api.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalStorageManagerService } from 'src/app/core/services/local-storage/local-storage-manager.service';
import { TranslateManagerService } from 'src/app/core/services/translate/translate-manager.service';
import { UserService } from 'src/app/core/services/user.service';

@UntilDestroy()
@Component({
	selector: 'feature-personnal-information',
	templateUrl: './personnal-information.component.html',
	styleUrls: ['./personnal-information.component.css'],
})
export class PersonnalInformationComponent implements OnInit {
	// Public properties
	public isEditable: boolean = false;
	public user!: UserModel;
	public profileForm!: FormGroup;
	public passwordForm!: FormGroup;

	public campusList!: Campus[];
	public sections!: Section[];
	public blocks!: Block[];

	// Lifcycle
	constructor(
		private _router: Router,
		private _userService: UserService,
		private _campusApiService: CampusApiService,
		private _sectionApiService: SectionApiService,
		private _blockApiService: BlockApiService,
		private _userApiService: UserApiService,
		private _toastr: ToastrService,
		private _authenticationService: AuthenticationService,
		private _localStorageManagerService: LocalStorageManagerService,
		private _translateManagerService: TranslateManagerService,
		private _translateService: TranslateService
	) {}

	// Calculed properties
	public isStudent(): boolean {
		return this.user.profile.role.name === RoleConstants.STUDENT;
	}

	ngOnInit(): void {
		this.user = this._userService.getUser;

		this.setupForm();
		this.setupProperties();
	}

	// Inner works
	private setupForm(): void {
		this.profileForm = new FormGroup({
			firstName: new FormControl(
				{ value: this.user.profile.firstName, disabled: true },
				[Validators.required]
			),
			lastName: new FormControl(
				{ value: this.user.profile.lastName, disabled: true },
				[Validators.required]
			),
			campus_id: new FormControl(
				this.user.profile.campus.id,
				Validators.required
			),
		});

		if (this.isStudent()) {
			this.profileForm.addControl(
				'section_id',
				new FormControl(this.user.profile.section?.id, Validators.required)
			);
			this.profileForm.addControl(
				'block_id',
				new FormControl(this.user.profile.block?.id, Validators.required)
			);
		}

		this.passwordForm = new FormGroup(
			{
				password: new FormControl(null, [
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

	private setupProperties(): void {
		this._campusApiService
			.getAllCampus()
			.pipe(
				untilDestroyed(this),
				tap((campus) => (this.campusList = campus)),
				filter(() => {
					return this.isStudent();
				}),
				concatMap(() => {
					return this._sectionApiService.getSectionsByCampus(
						this.user.profile.campus.id
					);
				}),
				concatMap((sections) => {
					this.sections = sections;
					return this._blockApiService.getBlocksBySection(
						this.user.profile.section.id
					);
				})
			)
			.subscribe((blocks) => {
				this.blocks = blocks;
			});
	}

	// Events
	public onSelectCampus(event: any): void {
		const campus_id: number = event.value;
		this._sectionApiService
			.getSectionsByCampus(campus_id)
			.pipe(untilDestroyed(this))
			.subscribe((sections) => {
				this.sections = sections;
			});
	}

	public onSelectSection(event: any): void {
		const section_id: number = event.value;
		this._blockApiService
			.getBlocksBySection(section_id)
			.pipe(untilDestroyed(this))
			.subscribe((blocks) => {
				this.blocks = blocks;
			});
	}

	public onEdit(): void {
		this.isEditable = !this.isEditable;

		if (this.isEditable) {
			this.profileForm.get('firstName')?.enable();
			this.profileForm.get('lastName')?.enable();
		} else {
			this.profileForm.get('firstName')?.disable();
			this.profileForm.get('lastName')?.disable();
		}
	}

	public onUpdateProfile(): void {
		const payload = this.profileForm.value;

		if (!this.isStudent()) {
			payload.section_id = null;
			payload.block_id = null;
		}

		if (this.profileForm.dirty) {
			this._userApiService
				.updateProfile(this.profileForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._router.navigateByUrl('/my-profile').then(() => {
							window.location.reload();
						});
					},
					error: () =>
						this._toastr.error(
							this._translateManagerService.getTranslation('status.error')
						),
				});
		} else {
			this.isEditable = false;
		}
	}

	public onUpdatePassword(): void {
		const password: { password: string } = this.passwordForm.value;
		this._userApiService
			.updatePassword(password)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: () => {
					this._toastr.success('Password changed !');
				},
				error: (err) => {
					this._toastr.error(err.error.message);
				},
				complete: () => {
					this.passwordForm.reset();
				},
			});
	}

	public suspendAccount(): void {
		const sure = window.confirm(
			this._translateManagerService.getTranslation(
				'my-profile.personnal-suspend.confirm'
			)
		);

		if (sure) {
			this._userApiService
				.suspendAccount()
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Account suspended !');
						this._authenticationService.logout();
					},
				});
		}
	}

	public languageChanged(event: any) {
		this._localStorageManagerService.setItemString(
			LocalStorageConstants.Key.LANGUAGE,
			event.value
		);
		this._translateManagerService.updateLanguage(event.value);
	}

	public getlanguage(): string {
		return this._translateService.currentLang;
	}
}
