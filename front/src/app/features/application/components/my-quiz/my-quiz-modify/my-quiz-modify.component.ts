import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { Quiz } from 'src/app/core/models/quiz.model';
import { Section, Block } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { QuizApiService } from 'src/app/core/services/api/quiz-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { TranslateManagerService } from 'src/app/core/services/translate/translate-manager.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChartBarValues } from 'src/app/shared/chart/models/chart-bar-values.interface';

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
	public stats!: ChartBarValues;
	public statsCount = 0;
	public questions!: FormArray;
	public initialFormValue!: any;

	public isTeacher: boolean = false;
	public sections!: Section[];
	public blocks!: Block[];

	// Lifecycle
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _quizApiService: QuizApiService,
		private _userService: UserService,
		private _sectionApiService: SectionApiService,
		private _blockApiService: BlockApiService,
		private _toastr: ToastrService,
		private _translateManagerService: TranslateManagerService
	) {}

	ngOnInit(): void {
		const user = this._userService.getUser;

		if (user.profile.role.name === RoleConstants.TEACHER) {
			this.isTeacher = true;
		}

		this._route.params.subscribe((params: Params) => {
			const id = +params['id'];

			forkJoin(
				this._quizApiService.getOneOwnQuiz(id),
				this._quizApiService.getOwnStatsFromId(id)
			)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: ([quiz, el]) => {
						this.quiz = quiz;
						this.setupForm();

						if (this.isTeacher) {
							this.quizModifyForm
								.get('section_id')
								?.addValidators(Validators.required);
							this.quizModifyForm
								.get('block_id')
								?.addValidators(Validators.required);
							forkJoin(
								this._sectionApiService.getSectionsByCampus(
									user.profile.campus.id
								),
								this._blockApiService.getBlocksBySection(quiz.sectionId)
							)
								.pipe(untilDestroyed(this))
								.subscribe({
									next: ([sections, blocks]) => {
										this.sections = sections;
										this.blocks = blocks;
									},
								});
						}

						this.initialFormValue = this.quizModifyForm.value;

						this.statsCount = el.count;
						const datas: number[] = [];
						const labels: string[] = [];

						el.stats.map((stat, index) => {
							datas.push((stat.correct / el.count) * 100);
							labels.push((index + 1).toString());
						});

						this.stats = {
							datas: datas,
							labels: labels,
						};
					},
					error: () => {
						this._router.navigate(['/'], { replaceUrl: true });
					},
				});
		});
	}

	// Inner works
	private setupForm(): void {
		const questionsControls = this.quiz.questions.map((question) => {
			return new FormGroup({
				id: new FormControl(question.id),
				title: new FormControl(question.title, Validators.required),
			});
		});

		this.quizModifyForm = new FormGroup({
			title: new FormControl(this.quiz.title, Validators.required),
			description: new FormControl(this.quiz.description, Validators.required),
			difficulty: new FormControl(this.quiz.difficulty, Validators.required),
			tags: new FormControl(this.quiz.tags?.join(',')),
			section_id: new FormControl(this.quiz.sectionId),
			block_id: new FormControl(this.quiz.blockId),
			isPublic: new FormControl(this.quiz.isPublic),
			questions: new FormArray(questionsControls),
		});

		this.questions = this.quizModifyForm.get('questions') as FormArray;
	}

	// Events
	public onSelectSection(event: any): void {
		const section_id: number = event.value;
		this._blockApiService
			.getBlocksBySection(section_id)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: (blocks) => {
					this.blocks = blocks;
				},
			});
	}

	public modifyQuiz(id: number): void {
		const quiz: Quiz = this.quizModifyForm.value;

		if (quiz.tags) {
			quiz.tags = this.quizModifyForm.value['tags'].split(',');
		}
		this._quizApiService
			.modifyOneOneQuiz(id, quiz)
			.pipe(untilDestroyed(this))
			.subscribe({
				next: () => {
					this._toastr.success('Quiz changed !');
				},
				error: () => {
					this._toastr.error(
						this._translateManagerService.getTranslation('status.error')
					);
				},
			});
	}

	public deleteQuiz(id: number): void {
		const sure = window.confirm(
			this._translateManagerService.getTranslation('my-quiz.modify.confirm')
		);

		if (sure) {
			this._quizApiService
				.deleteOneOwnQuiz(id)
				.pipe(untilDestroyed(this))
				.subscribe({
					next: () => {
						this._toastr.success('Quiz deleted !');
						this._router.navigateByUrl('/my-quiz');
					},
					error: () => {
						this._toastr.error(
							this._translateManagerService.getTranslation('status.error')
						);
					},
				});
		}
	}
}
