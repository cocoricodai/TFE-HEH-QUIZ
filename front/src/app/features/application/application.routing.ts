import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationContainerComponent } from './components/application-container/application-container.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PersonnalInformationComponent } from './components/my-profile/personnal-information/personnal-information.component';
import { QuizHistoryComponent } from './components/my-profile/quiz-history/quiz-history.component';
import { PrivateComponent } from './components/my-quiz/private/private.component';
import { MyQuizModifyComponent } from './components/my-quiz/my-quiz-modify/my-quiz-modify.component';
import { MyQuizComponent } from './components/my-quiz/my-quiz.component';
import { PublicComponent } from './components/my-quiz/public/public.component';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: ApplicationContainerComponent,
				children: [
					{
						path: 'quiz/:id',
						component: QuizComponent,
					},
					{
						path: 'my-quiz',
						component: MyQuizComponent,
						title: 'routing.application.my-quiz',
						children: [
							{
								path: '',
								redirectTo: 'published',
								pathMatch: 'full',
							},
							{
								path: 'published',
								component: PublicComponent,
							},
							{
								path: 'draft',
								component: PrivateComponent,
							},
							{
								path: ':id',
								component: MyQuizModifyComponent,
							},
						],
					},
					{
						path: 'my-profile',
						component: MyProfileComponent,
						title: 'routing.application.my-profile',
						children: [
							{
								path: '',
								redirectTo: 'personnal-information',
								pathMatch: 'full',
							},
							{
								path: 'personnal-information',
								component: PersonnalInformationComponent,
							},
							{
								path: 'quiz-history',
								component: QuizHistoryComponent,
							},
						],
					},
					{
						path: 'new-quiz',
						component: NewQuizComponent,
						title: 'routing.application.new-quiz',
					},
					{
						path: 'profile/:id',
						component: ProfileComponent,
						title: 'routing.application.profile',
					},
					{
						path: '',
						component: HomeComponent,
						title: 'routing.application.home',
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class ApplicationRouting {}
