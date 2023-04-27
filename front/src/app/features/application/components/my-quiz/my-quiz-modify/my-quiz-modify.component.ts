import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';

@UntilDestroy()
@Component({
	selector: 'feature-my-quiz-modify',
	templateUrl: './my-quiz-modify.component.html',
	styleUrls: ['./my-quiz-modify.component.css'],
})
export class MyQuizModifyComponent implements OnInit {
	// Public properties
	public quiz!: Quiz;
	public quizModifyForm!: FormGroup;

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _quizApiService: QuizApiService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params: Params) => {
			const id = +params['id'];

			this._quizApiService
				.getOneOwnQuiz(id)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: (quiz) => {
						this.quiz = quiz;
						this.setupForm();
					},
					error: () => {
						this._router.navigate(['/'], { replaceUrl: true });
					},
				});
		});
	}

	// Inner works
	private setupForm(): void {
		this.quizModifyForm = new FormGroup({
			title: new FormControl(this.quiz.title, Validators.required),
			description: new FormControl(this.quiz.description, Validators.required),
			difficulty: new FormControl(this.quiz.difficulty, Validators.required),
			tags: new FormControl(this.quiz.tags),
			isPublished: new FormControl(this.quiz.isPublished),
		});
	}
}
