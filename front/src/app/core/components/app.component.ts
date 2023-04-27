import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from 'src/app/shared/dark-mode/services/dark-mode.service';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';
import { LocalStorageManagerService } from '../services/local-storage/local-storage-manager.service';
import { LocalStorageConstants } from '../constants/local-storage.constants';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	title = 'front';

	// Public properties
	public isLoading = false;

	// Lifecycle
	constructor(
		private _darkModeService: DarkModeService,
		private _translateService: TranslateService,
		private _loadingService: LoadingService,
		private _localStorageManagerService: LocalStorageManagerService
	) {}

	ngOnInit(): void {
		this._darkModeService.setupDarkMode();

		this._translateService.setDefaultLang('en-US');

		if (
			!this._localStorageManagerService.getItemString(
				LocalStorageConstants.Key.LANGUAGE
			)
		)
			this._localStorageManagerService.setItemString(
				LocalStorageConstants.Key.LANGUAGE,
				navigator.language.match(/en|fr/) ? navigator.language : 'en-US'
			);

		const language = this._localStorageManagerService.getItemString(
			LocalStorageConstants.Key.LANGUAGE
		);
		if (language !== null) {
			this._translateService.use(language);
		}

		this._loadingService.isLoading$.subscribe(
			(isLoading) => (this.isLoading = isLoading)
		);
	}
}
