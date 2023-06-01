import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerQuiz } from 'src/app/core/models/answer-quiz.interface';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
	selector: 'quiz-second-step',
	templateUrl: './second-step.component.html',
})
export class QuizSecondStepComponent implements OnInit {
	// Public Properties
	public responses: AnswerQuiz[] = [];
	public score = 0;

	// Inputs & Outputs
	@Input()
	public quiz!: Quiz;

	@Output()
	public endQuiz = new EventEmitter<{
		score: number;
		responses: AnswerQuiz[];
	}>();

	public currentQuestion = 0;
	public quizForm!: FormGroup;

	public ngOnInit(): void {
		this.quizForm = new FormGroup({
			answer: new FormControl('', [Validators.required]),
		});
	}

	public onNextQuestion(): void {
		if (
			this.quiz.questions[this.currentQuestion].correctAnswer ===
			this.quizForm.value['answer']
		) {
			this.score += this.quiz.questions[this.currentQuestion].points;
		}

		this.responses.push({
			id: this.quiz.questions[this.currentQuestion].id as number,
			answer: this.quizForm.value['answer'],
		});

		this.currentQuestion += 1;
		this.quizForm.reset();
		if (this.currentQuestion === this.quiz.questions.length) {
			this.endQuiz.emit({ score: this.score, responses: this.responses });
		}
	}
}
