import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { Quiz } from 'src/app/core/models/quiz.model';
import { Block, Section } from 'src/app/core/models/response-api.model';
import { BlockApiService } from 'src/app/core/services/api/block-api.service';
import { SectionApiService } from 'src/app/core/services/api/section-api.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'feature-new-quiz-first-step',
	templateUrl: './first-step.component.html',
	styleUrls: ['../new-quiz.component.css'],
})
export class NewQuizFirstStepComponent implements OnInit {
	// Output
	@Output()
	firstStep: EventEmitter<Quiz> = new EventEmitter<Quiz>();

	// Public properties
	public firstStepForm!: FormGroup;
	public isTeacher: boolean = false;
	public sections!: Section[];
	public blocks!: Block[];

	// Events
	public onSelectSection(event: any): void {
		const section_id: number = event.value;
		this._blockApiService.getBlocksBySection(section_id).subscribe({
			next: (blocks) => {
				this.blocks = blocks;
			},
		});
	}

	public onSubmit(): void {
		const quiz: Quiz = this.firstStepForm.value;

		quiz.tags = this.firstStepForm.value['tags'].split(',');

		this.firstStep.emit(quiz);
	}

	// Lifecycle
	constructor(
		private _sectionApiService: SectionApiService,
		private _blockApiService: BlockApiService,
		private _userService: UserService
	) {}

	ngOnInit(): void {
		const user = this._userService.getUser;

		if (user.profile.role.name === RoleConstants.TEACHER) {
			this.isTeacher = true;
		}

		this.firstStepForm = new FormGroup({
			title: new FormControl('', [
				Validators.required,
				Validators.maxLength(255),
			]),
			description: new FormControl('', [
				Validators.required,
				Validators.maxLength(255),
			]),
			difficulty: new FormControl('medium', [Validators.required]),
			tags: new FormControl('', [
				Validators.pattern(/^([a-zA-Z]+\s*,\s*){0,2}[a-zA-Z]+$/),
			]),
			section_id: new FormControl(''),
			block_id: new FormControl(''),
			isPublished: new FormControl(true),
		});

		if (this.isTeacher) {
			this.firstStepForm.get('section_id')?.addValidators(Validators.required);
			this.firstStepForm.get('block_id')?.addValidators(Validators.required);
			this._sectionApiService
				.getSectionsByCampus(user.profile.campus.id)
				.subscribe({
					next: (sections) => (this.sections = sections),
				});
		}
	}
}
