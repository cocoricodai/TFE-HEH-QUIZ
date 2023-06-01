import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectLanguageComponent } from './components/select-language.component';

@NgModule({
	imports: [CommonModule],
	declarations: [SelectLanguageComponent],
	exports: [SelectLanguageComponent],
})
export class SelectLanguageModule {}
