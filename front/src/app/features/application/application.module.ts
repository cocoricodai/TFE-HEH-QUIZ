import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationRouting } from './application.routing';
import { ApplicationContainerComponent } from './components/application-container/application-container.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileNavbarComponent } from './components/my-profile/my-profile-navbar/my-profile-navbar.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PersonnalInformationComponent } from './components/my-profile/personnal-information/personnal-information.component';
import { QuizHistoryComponent } from './components/my-profile/quiz-history/quiz-history.component';
import { PrivateComponent } from './components/my-quiz/private/private.component';
import { MyQuizModifyComponent } from './components/my-quiz/my-quiz-modify/my-quiz-modify.component';
import { MyQuizNavbarComponent } from './components/my-quiz/my-quiz-navbar/my-quiz-navbar.component';
import { MyQuizComponent } from './components/my-quiz/my-quiz.component';
import { PublicComponent } from './components/my-quiz/public/public.component';
import { MyQuizCardComponent } from './components/my-quiz/my-quiz-card/my-quiz-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewQuizFirstStepComponent } from './components/new-quiz/first-step/first-step.component';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { NewQuizSecondStepComponent } from './components/new-quiz/second-step/second-step.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { NewQuizCardComponent } from './components/new-quiz/card-quiz/card-quiz.component';
import { QuizCardComponent } from './components/home/quiz-card/quiz-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuizFirstStepComponent } from './components/quiz/first-step/first-step.component';
import { QuizSecondStepComponent } from './components/quiz/second-step/second-step.component';
import { TitleStrategy } from '@angular/router';
import { TitleManagerService } from 'src/app/core/services/title/title-manager.service';
import { QuizthirdStepComponent } from './components/quiz/third-step/third-step.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ApplicationRouting,
		SharedModule,
		TranslateModule.forChild(),
	],
	declarations: [
		SearchComponent,
		NavbarComponent,
		ApplicationContainerComponent,
		MyQuizComponent,
		MyQuizNavbarComponent,
		MyQuizModifyComponent,
		MyQuizCardComponent,
		PublicComponent,
		PrivateComponent,
		MyProfileComponent,
		MyProfileNavbarComponent,
		PersonnalInformationComponent,
		QuizHistoryComponent,
		NewQuizComponent,
		NewQuizCardComponent,
		NewQuizFirstStepComponent,
		NewQuizSecondStepComponent,
		HomeComponent,
		QuizCardComponent,
		QuizComponent,
		BackButtonDirective,
		ProfileComponent,
		QuizFirstStepComponent,
		QuizSecondStepComponent,
		QuizthirdStepComponent,
	],
})
export class ApplicationModule {}
