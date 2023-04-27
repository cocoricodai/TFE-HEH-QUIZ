import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'feature-new-quiz-second-step',
	templateUrl: './second-step.component.html',
	styleUrls: ['../new-quiz.component.css'],
})
export class NewQuizSecondStepComponent implements OnInit {
	// Inputs & Outputs
	@Input()
	public quizInformations!: Quiz;

	@Output()
	public secondStep = new EventEmitter<Question[]>();

	// Public properties
	public secondStepForm!: FormGroup;
	public questions: Question[] = [];
	public selectedFile!: string;

	// Events
	public onFileSelected(event: any): void {
		const file = event.target.files[0];

		const reader = new FileReader();

		reader.onload = () => {
			const base64String = reader.result;
			this.selectedFile = base64String as string;
		};

		reader.readAsDataURL(file);
	}

	public onAdd(): void {
		let choices = [
			this.secondStepForm.value.correctAnswer,
			this.secondStepForm.value.wrongAnswer1,
		];

		this.secondStepForm.value.wrongAnswer2 === '' ||
		this.secondStepForm.value.wrongAnswer2 === null
			? ''
			: choices.push(this.secondStepForm.value.wrongAnswer2);

		this.secondStepForm.value.wrongAnswer3 === '' ||
		this.secondStepForm.value.wrongAnswer3 === null
			? ''
			: choices.push(this.secondStepForm.value.wrongAnswer3);

		this.questions.push({
			title: this.secondStepForm.value?.title,
			image: this.selectedFile,
			choices,
			correctAnswer: this.secondStepForm.value.correctAnswer,
			points: this.secondStepForm.value.points,
		});

		this.selectedFile = '';
		this.secondStepForm.reset({ points: 1 });
	}

	onSubmit(): void {
		this.secondStep.emit(this.questions);
	}

	// Lifecycle
	ngOnInit(): void {
		this.setupForm();
	}

	// Inner works
	private setupForm(): void {
		this.secondStepForm = new FormGroup({
			title: new FormControl('', [Validators.required]),
			image: new FormControl(''),
			correctAnswer: new FormControl('', [Validators.required]),
			wrongAnswer1: new FormControl('', [Validators.required]),
			wrongAnswer2: new FormControl(''),
			wrongAnswer3: new FormControl(''),
			points: new FormControl(1, [Validators.required]),
		});
	}
}
