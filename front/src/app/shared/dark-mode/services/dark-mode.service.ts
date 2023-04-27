import { Injectable } from '@angular/core';
import { LocalStorageConstants } from 'src/app/core/constants/local-storage.constants';
import { LocalStorageManagerService } from 'src/app/core/services/local-storage/local-storage-manager.service';

@Injectable({
	providedIn: 'root',
})
export class DarkModeService {
	isDarkMode: boolean = false;

	// Lifecycle
	constructor(private localStorageManagerService: LocalStorageManagerService) {}

	// Public
	public setupDarkMode() {
		this.isDarkMode = JSON.parse(
			this.localStorageManagerService.getItemString(
				LocalStorageConstants.Key.DARK_MODE
			) || 'false'
		);
		this.updateDarkMode();
	}

	// Events
	public toggleDarkMode(): void {
		this.isDarkMode = !this.isDarkMode;
		this.localStorageManagerService.setItemString(
			LocalStorageConstants.Key.DARK_MODE,
			JSON.stringify(this.isDarkMode)
		);
		this.updateDarkMode();
	}

	// Inner work
	private updateDarkMode(): void {
		if (this.isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
}
