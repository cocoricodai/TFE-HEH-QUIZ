import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Model, SurveyModel, SurveyNG } from 'survey-angular';

@Component({
	selector: 'survey',
	template: '<div id="surveyContainer"></div>',
	styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
	@Input()
	public surveyJson!: {};

	@Output()
	public surveyRes: EventEmitter<SurveyModel> = new EventEmitter<SurveyModel>();

	// Events
	public alertComponent(sender: SurveyModel) {
		this.surveyRes.emit(sender);
	}

	// LifeCycle
	ngOnInit(): void {
		const survey = new Model(this.surveyJson);
		SurveyNG.render('surveyContainer', { model: survey });

		survey.onComplete.add((sender: SurveyModel) => {
			this.alertComponent(sender);
		});
	}
}
