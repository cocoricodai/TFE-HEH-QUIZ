import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Campus } from 'src/app/core/models/response-api.model';
import { CampusApiService } from 'src/app/core/services/api/campus-api.service';

@UntilDestroy()
@Component({
	selector: 'edit-campus',
	templateUrl: './dashboard-edit-campus.component.html',
	styleUrls: ['./form.css'],
})
export class DashboardEditCampus implements OnInit {
	// Public
	public campusForm!: FormGroup;
	public campus!: Campus;
	public action!: 'new' | 'edit';
	public param!: string;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _campusApiService: CampusApiService,
		private _toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.setupForm();
		this._route.params.subscribe((params: Params) => {
			this.param = params['id'];

			if (this.param === 'new') {
				this.action = 'new';
			} else {
				this.action = 'edit';
				this._campusApiService
					.getOneCampus(+this.param)
					.pipe(untilDestroyed(this))
					.subscribe({
						next: (campus) => {
							this.campus = campus;
							this.campusForm.patchValue({ name: campus.name });
						},
					});
			}
		});
	}

	private setupForm(): void {
		this.campusForm = new FormGroup({
			name: new FormControl('', Validators.required),
		});
	}

	public onSubmit(): void {
		if (this.action === 'new') {
			this._campusApiService
				.createOneCampus(this.campusForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Campus added');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		} else {
			this._campusApiService
				.modifyOneCampus(+this.param, this.campusForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Campus changed');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
