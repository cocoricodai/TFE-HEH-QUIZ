import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Campus } from 'src/app/core/models/response-api.model';
import { CampusApiService } from 'src/app/core/services/api/campus-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';

@UntilDestroy()
@Component({
	selector: 'edit-section',
	templateUrl: './dashboard-edit-section.component.html',
	styleUrls: ['./form.css'],
})
export class DashboardEditSection implements OnInit {
	// Public
	public sectionForm!: FormGroup;
	public campus!: Campus[];
	public action!: 'new' | 'edit';
	public param!: string;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _campusApiService: CampusApiService,
		private _sectionApiService: SectionApiService,
		private _toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.setupForm();
		this._route.params.subscribe((params: Params) => {
			this.param = params['id'];

			this._campusApiService
				.getAllCampus()
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (campus) => (this.campus = campus),
				});

			if (this.param === 'new') {
				this.action = 'new';
			} else {
				this.action = 'edit';
				this._sectionApiService
					.getOneSection(+this.param)
					.pipe(untilDestroyed(this))
					.subscribe({
						next: (section) => {
							this.sectionForm.patchValue({
								campus_id: section.campus.id,
								name: section.name,
							});
						},
					});
			}
		});
	}

	private setupForm(): void {
		this.sectionForm = new FormGroup({
			campus_id: new FormControl('', Validators.required),
			name: new FormControl('', Validators.required),
		});
	}

	public onSubmit(): void {
		if (this.action === 'new') {
			this._sectionApiService
				.createOneSection(this.sectionForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section added');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		} else {
			this._sectionApiService
				.modifyOneSection(+this.param, this.sectionForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section changed');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
