import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateManagerService } from '../translate/translate-manager.service';

@Injectable({
	providedIn: 'root',
})
export class TitleManagerService extends TitleStrategy {
	constructor(
		private readonly title: Title,
		private _translateManagerService: TranslateManagerService
	) {
		super();
	}

	override updateTitle(routerState: RouterStateSnapshot) {
		const title = this.buildTitle(routerState);
		if (title !== undefined) {
			const titleTranslate =
				this._translateManagerService.getTranslation(title);
			this.title.setTitle(`${titleTranslate} | 	Quizaire`);
		}
	}
}
