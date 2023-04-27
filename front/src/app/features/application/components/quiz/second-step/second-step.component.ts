import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'quiz-second-step',
	templateUrl: './second-step.component.html',
})
export class QuizSecondStepComponent implements OnInit {
	// Inputs & Outputs
	@Input()
	public quiz!: Quiz;

	@Output()
	public endQuiz = new EventEmitter<boolean>();

	public currentQuestion = 0;
	public quizForm!: FormGroup;

	public ngOnInit(): void {
		this.quizForm = new FormGroup({
			answer: new FormControl('', [Validators.required]),
		});
	}

	public onNextQuestion(): void {
		if (this.currentQuestion !== this.quiz.questions.length - 1) {
			this.currentQuestion += 1;
			this.quizForm.reset();
		} else {
			this.endQuiz.emit(true);
		}
	}
}
