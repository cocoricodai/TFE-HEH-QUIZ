import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBlockComponent } from './components/dashboard-block/dashboard-block.component';
import { DashboardCampusComponent } from './components/dashboard-campus/dashboard-campus.component';
import { DashboardDefaultViewComponent } from './components/dashboard-default-view/dashboard-default-view.component';
import { DashboardQuizComponent } from './components/dashboard-quiz/dashboard-quiz.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DahsboardComponent } from './components/dashboard.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'dashboard',
				component: DahsboardComponent,
				children: [
					{
						path: '',
						component: DashboardDefaultViewComponent,
					},
					{
						path: 'user',
						component: DashboardUserComponent,
					},
					{
						path: 'quiz',
						component: DashboardQuizComponent,
					},
					{
						path: 'campus',
						component: DashboardCampusComponent,
					},
					{
						path: 'section',
						component: DashboardSectionComponent,
					},
					{
						path: 'block',
						component: DashboardBlockComponent,
					},
					{
						path: ':type/new',
						component: DashboardCampusComponent,
					},
					{
						path: ':type/:id',
						component: DashboardBlockComponent,
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class DashboardRouting {}
