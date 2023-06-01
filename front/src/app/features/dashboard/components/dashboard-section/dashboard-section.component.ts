import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-section',
	templateUrl: './dashboard-section.component.html',
})
export class DashboardSectionComponent implements OnInit {
	// Public properties
	public sections!: Array<{ id: number; campus: string; section: string }>;

	// Lifecycle
	constructor(
		private _sectionApiService: SectionApiService,
		private _toastr: ToastrService
	) {}

	ngOnInit(): void {
		this._sectionApiService
			.getAllSections()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (sections) => {
					this.sections = sections.map((section) => {
						return {
							id: section.id,
							campus: section.campus.name,
							section: section.name,
						};
					});
				},
			});
	}

	public deleteSection(id: string | number) {
		if (typeof id === 'number') {
			this._sectionApiService
				.deleteOneSection(id)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Section deleted');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
