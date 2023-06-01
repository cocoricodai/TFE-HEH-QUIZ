import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslateManagerService {
	// Lifecycle
	constructor(private _translateService: TranslateService) {}

	// Public
	public getTranslation(key: string): string {
		return this._translateService.instant(key);
	}

	public getCurrentLanguage(): string {
		return this._translateService.currentLang;
	}

	public updateLanguage(language: string): void {
		this._translateService.use(language);
	}
}
