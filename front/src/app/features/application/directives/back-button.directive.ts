import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[backButton]',
})
export class BackButtonDirective {
	// Lifecycle
	constructor(private _location: Location) {}

	@HostListener('click')
	public onClick() {
		this._location.back();
	}
}
