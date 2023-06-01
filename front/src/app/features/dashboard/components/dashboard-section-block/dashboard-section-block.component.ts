import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { SectionBlock } from 'src/app/core/models/section-block.model';
import { SectionBlockApiService } from 'src/app/core/services/api/section-block-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-section-block',
	templateUrl: './dashboard-section-block.component.html',
})
export class DashboardSectionBlockComponent implements OnInit {
	// Public Properties
	public sectionBlocks!: SectionBlock[];

	// Lifecycle
	constructor(
		private _sectionBlockApiService: SectionBlockApiService,
		private _toastr: ToastrService
	) {}

	public ngOnInit(): void {
		this._sectionBlockApiService
			.getAllSectionBlocks()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (sectionBlocks) => {
					this.sectionBlocks = sectionBlocks;
				},
			});
	}

	public deleteSectionBlock(id: number | string) {
		if (typeof id === 'number') {
			this._sectionBlockApiService
				.deleteOneSectionBlock(id)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section block deleted');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
