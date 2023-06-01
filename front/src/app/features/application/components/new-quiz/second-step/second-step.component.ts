import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';
import { ResponseSurvey } from 'src/app/core/models/response.survey.interface';
import { TranslateManagerService } from 'src/app/core/services/translate/translate-manager.service';
import { SurveyModel } from 'survey-angular';

@Component({
	selector: 'feature-new-quiz-second-step',
	templateUrl: './second-step.component.html',
	styleUrls: ['../new-quiz.component.css'],
})
export class NewQuizSecondStepComponent {
	constructor(private _translateManagerService: TranslateManagerService) {}

	public surveyJson = {
		logoPosition: 'right',
		pages: [
			{
				name: 'page1',
				elements: [
					{
						type: 'paneldynamic',
						name: 'questions',
						titleLocation: 'hidden',
						isRequired: true,
						templateElements: [
							{
								type: 'text',
								name: 'title',
								title: this._translateManagerService.getTranslation(
									'form.input.label.title'
								),
								titleLocation: 'top',
								isRequired: true,
								maxLength: 255,
							},
							{
								type: 'file',
								name: 'image',
								title: 'Image',
								titleLocation: 'top',
								acceptedTypes: 'image/*',
								waitForUpload: true,
							},
							{
								type: 'text',
								name: 'correctAnswer',
								title: 'Correct Answer',
								titleLocation: 'top',
								isRequired: true,
								maxLength: 255,
							},
							{
								type: 'text',
								name: 'wrongAnswer1',
								title: 'Wrong Answer',
								titleLocation: 'top',
								isRequired: true,
								maxLength: 255,
							},
							{
								type: 'text',
								name: 'wrongAnswer2',
								title: 'Wrong answer 2',
								titleLocation: 'top',
								maxLength: 255,
							},
							{
								type: 'text',
								name: 'wrongAnswer3',
								title: 'Wrong Answer 3',
								titleLocation: 'top',
								maxLength: 255,
							},
							{
								type: 'text',
								name: 'points',
								title: 'Points',
								titleLocation: 'top',
								defaultValueExpression: '1',
								isRequired: true,
								inputType: 'number',
								min: 1,
								max: 10,
								step: 1,
							},
						],
						templateTabTitle: 'Question {panelIndex}',
						panelCount: 4,
						minPanelCount: 4,
						maxPanelCount: 20,
						showQuestionNumbers: 'onPanel',
						renderMode: 'tab',
					},
				],
				navigationButtonsVisibility: 'show',
			},
		],
		widthMode: 'static',
	};

	// Inputs & Outputs
	@Input()
	public quizInformations!: Quiz;

	@Output()
	public secondStep = new EventEmitter<Question[]>();

	// Public properties
	public secondStepForm!: FormGroup;

	public quizComplete(sender: SurveyModel) {
		const responses: ResponseSurvey[] = sender.data
			.questions as ResponseSurvey[];

		const responseFormated = responses.map((response) => {
			let choices = [response.correctAnswer, response.wrongAnswer1];

			if (response?.wrongAnswer2) choices.push(response?.wrongAnswer2);

			if (response?.wrongAnswer3) choices.push(response?.wrongAnswer3);

			return {
				title: response.title,
				image: response?.image ? response.image[0].content : null,
				correctAnswer: response.correctAnswer,
				choices,
				points: response.points,
			};
		});
		this.secondStep.emit(responseFormated);
	}
}
