import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Block } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-campus',
	templateUrl: './dashboard-block.component.html',
})
export class DashboardBlockComponent implements OnInit {
	// Public properties
	public blocks: Block[] = [];

	// Lifecycle
	constructor(
		private _blockApiService: BlockApiService,
		private _toastr: ToastrService
	) {}

	ngOnInit(): void {
		this._blockApiService
			.getAllBlocks()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (blocks) => (this.blocks = blocks),
			});
	}

	public deleteBlock(id: number | string) {
		if (typeof id === 'number') {
			this._blockApiService
				.deleteOneBlock(id)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Block deleted');
					},
					error: (err) => {
						this._toastr.error(err.error.message);
					},
				});
		}
	}
}
