import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { buffer, filter, fromEvent, interval } from 'rxjs';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
	selector: 'dark-mode-toggle',
	templateUrl: './dark-mode-toggle.component.html',
})
export class DarkModeToggleComponent implements AfterViewInit {
	// ViewChild
	@ViewChild('toggle', { static: true })
	public toggle!: ElementRef;

	// public properties
	public isToggle: boolean = false;

	// Lifecycle
	constructor(private darkModeService: DarkModeService) {
		if (darkModeService.isDarkMode) {
			this.isToggle = true;
		}
	}

	ngAfterViewInit(): void {
		const click$ = fromEvent(this.toggle.nativeElement, 'click');
		const interval$ = interval(2000);

		// click$
		//   .pipe(
		//     buffer(interval$),
		//     filter((clicks) => clicks.length >= 10),
		//   )
		//   .subscribe({
		//     next: () => {
		//       setInterval(() => {
		//         document.documentElement.classList.toggle("dark")
		//         this.isToggle = !this.isToggle
		//       }, 50)
		//     }
		//   });
	}

	// Public
	public onDarkModeToggle(): void {
		this.isToggle = !this.isToggle;
		this.darkModeService.toggleDarkMode();
	}
}
