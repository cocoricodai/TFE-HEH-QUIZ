import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
	// Lifecycle
	constructor(private _location: Location) {}

	// Events
	public goBack(): void {
		this._location.back();
	}
}
