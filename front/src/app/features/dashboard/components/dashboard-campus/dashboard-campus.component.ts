import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Campus } from 'src/app/core/models/response-api.model';
import { CampusApiService } from 'src/app/core/services/api/campus-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-dashboard-campus',
	templateUrl: './dashboard-campus.component.html',
})
export class DashboardCampusComponent implements OnInit {
	// Public properties
	public campus: Campus[] = [];

	// Lifecycle
	constructor(private _campusApiService: CampusApiService) {}

	ngOnInit(): void {
		this._campusApiService
			.getAllCampus()
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (campus) => (this.campus = campus),
			});
	}
}
