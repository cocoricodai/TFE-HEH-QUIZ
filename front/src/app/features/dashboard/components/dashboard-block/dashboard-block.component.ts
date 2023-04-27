import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Block } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-campus',
	templateUrl: './dashboard-block.component.html',
})
export class DashboardBlockComponent implements OnInit {
	// Public properties
	public blocks: Block[] = [];

	// Lifecycle
	constructor(private _blockApiService: BlockApiService) {}

	ngOnInit(): void {
		this._blockApiService
			.getAllBlocks()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (blocks) => (this.blocks = blocks),
			});
	}
}
