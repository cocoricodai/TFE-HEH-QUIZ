import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Block, Section } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { SectionBlockApiService } from 'src/app/core/services/api/section-block-api.service';

@UntilDestroy()
@Component({
	selector: 'edit-section-block',
	templateUrl: './dashboard-edit-section-block.component.html',
	styleUrls: ['./form.css'],
})
export class DashboardEditSectionBlock implements OnInit {
	// Public
	public sectionBlockForm!: FormGroup;
	public blocks!: Block[];
	public sections!: Section[];
	public action!: 'new' | 'edit';
	public param!: string;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _blockApiService: BlockApiService,
		private _sectionApiService: SectionApiService,
		private _sectionBlockApiService: SectionBlockApiService,
		private _toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.setupForm();
		this._route.params.subscribe((params: Params) => {
			this.param = params['id'];

			forkJoin(
				this._sectionApiService.getAllSections(),
				this._blockApiService.getAllBlocks()
			)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: ([sections, blocks]) => {
						this.sections = sections;
						this.blocks = blocks;
					},
				});
			this._sectionApiService
				.getAllSections()
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (sections) => (this.sections = sections),
				});

			if (this.param === 'new') {
				this.action = 'new';
			} else {
				this.action = 'edit';
				this._sectionBlockApiService
					.getOneSectionBlock(+this.param)
					.pipe(untilDestroyed(this))
					.subscribe({
						next: (sectionBlock) => {
							this.sectionBlockForm.patchValue({
								block_id: sectionBlock.block_id,
								section_id: sectionBlock.section_id,
							});
						},
					});
			}
		});
	}

	private setupForm(): void {
		this.sectionBlockForm = new FormGroup({
			section_id: new FormControl('', Validators.required),
			block_id: new FormControl('', Validators.required),
		});
	}

	public onSubmit(): void {
		if (this.action === 'new') {
			this._sectionBlockApiService
				.createOneSectionBlock(this.sectionBlockForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section block added');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		} else {
			this._sectionBlockApiService
				.modifyOneSectionBlock(+this.param, this.sectionBlockForm.value)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section block changed');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
