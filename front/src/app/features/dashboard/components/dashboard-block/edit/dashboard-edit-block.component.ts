import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Block, Campus } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';

@UntilDestroy()
@Component({
	selector: 'edit-block',
	templateUrl: './dashboard-edit-block.component.html',
	styleUrls: ['./form.css'],
})
export class DashboardEditBlock implements OnInit {
	// Public
	public blockForm!: FormGroup;
	public block!: Block;
	public action!: 'new' | 'edit';
	public param!: string;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _blockApiService: BlockApiService,
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
				this._blockApiService
					.getOneBlock(+this.param)
					.pipe(untilDestroyed(this))
					.subscribe({
						next: (block) => {
							this.block = block;
							this.blockForm.patchValue({ name: block.name });
						},
					});
			}
		});
	}

	private setupForm(): void {
		this.blockForm = new FormGroup({
			name: new FormControl('', Validators.required),
		});
	}

	public onSubmit(): void {
		if (this.action === 'new') {
			this._blockApiService
				.createOneBlock(this.blockForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Block added');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		} else {
			this._blockApiService
				.modifyOneBlock(+this.param, this.blockForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Block changed');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
