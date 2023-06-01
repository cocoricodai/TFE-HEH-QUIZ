import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyComponent } from './components/survey.component';

@NgModule({
	imports: [],
	declarations: [SurveyComponent],
	exports: [SurveyComponent],
})
export class CustomSurveyModule {}
