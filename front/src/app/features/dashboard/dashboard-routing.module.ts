import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBlockComponent } from './components/dashboard-block/dashboard-block.component';
import { DashboardCampusComponent } from './components/dashboard-campus/dashboard-campus.component';
import { DashboardDefaultViewComponent } from './components/dashboard-default-view/dashboard-default-view.component';
import { DashboardQuizComponent } from './components/dashboard-quiz/dashboard-quiz.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DahsboardComponent } from './components/dashboard.component';
import { DashboardSectionBlockComponent } from './components/dashboard-section-block/dashboard-section-block.component';
import { DashboardEditCampus } from './components/dashboard-campus/edit/dashboard-edit-campus.component';
import { DashboardEditSection } from './components/dashboard-section/edit/dashboard-edit-section.component';
import { DashboardEditBlock } from './components/dashboard-block/edit/dashboard-edit-block.component';
import { DashboardEditSectionBlock } from './components/dashboard-section-block/edit/dashboard-edit-section-block.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'dashboard',
				component: DahsboardComponent,
				title: 'Dashboard',
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
						children: [
							{
								path: ':id',
								component: DashboardEditCampus,
							},
						],
					},
					{
						path: 'section',
						component: DashboardSectionComponent,
						children: [
							{
								path: ':id',
								component: DashboardEditSection,
							},
						],
					},
					{
						path: 'block',
						component: DashboardBlockComponent,
						children: [
							{
								path: ':id',
								component: DashboardEditBlock,
							},
						],
					},
					{
						path: 'section-block',
						component: DashboardSectionBlockComponent,
						children: [
							{
								path: ':id',
								component: DashboardEditSectionBlock,
							},
						],
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class DashboardRouting {}
