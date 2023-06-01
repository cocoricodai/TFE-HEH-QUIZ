import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from 'src/app/core/constants/local-storage.constants';
import { LocalStorageManagerService } from 'src/app/core/services/local-storage/local-storage-manager.service';
import { TranslateManagerService } from 'src/app/core/services/translate/translate-manager.service';

@Component({
	selector: 'shared-select-langage',
	templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent {
	// Lifecycle
	constructor(
		private _localStorageManagerService: LocalStorageManagerService,
		private _translateManagerService: TranslateManagerService,
		private _translateService: TranslateService
	) {}

	public languageChanged(event: any) {
		this._localStorageManagerService.setItemString(
			LocalStorageConstants.Key.LANGUAGE,
			event.value
		);
		this._translateManagerService.updateLanguage(event.value);
	}

	public getlanguage(): string {
		return this._translateService.currentLang;
	}
}
