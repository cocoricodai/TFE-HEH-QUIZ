import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardBlockComponent } from './components/dashboard-block/dashboard-block.component';
import { DashboardCampusComponent } from './components/dashboard-campus/dashboard-campus.component';
import { DashboardDefaultViewComponent } from './components/dashboard-default-view/dashboard-default-view.component';
import { DashboardItemStats } from './components/dashboard-default-view/dashboard-item-stats/dashboard-item-stats.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { DashboardQuizComponent } from './components/dashboard-quiz/dashboard-quiz.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DahsboardComponent } from './components/dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';
import { ColumnHeader } from './pipes/column-header.pipe';
import { NumberCountFormat } from './pipes/number-count-format.pipe';
import { DashboardSectionBlockComponent } from './components/dashboard-section-block/dashboard-section-block.component';
import { DashboardEditCampus } from './components/dashboard-campus/edit/dashboard-edit-campus.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardEditSection } from './components/dashboard-section/edit/dashboard-edit-section.component';
import { DashboardEditBlock } from './components/dashboard-block/edit/dashboard-edit-block.component';
import { DashboardEditSectionBlock } from './components/dashboard-section-block/edit/dashboard-edit-section-block.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, SharedModule, DashboardRouting],
	declarations: [
		DahsboardComponent,
		DashboardDefaultViewComponent,
		DashboardNavbarComponent,
		DashboardUserComponent,
		DashboardQuizComponent,
		DashboardCampusComponent,
		DashboardEditCampus,
		DashboardSectionComponent,
		DashboardEditSection,
		DashboardBlockComponent,
		DashboardEditBlock,
		DashboardSectionBlockComponent,
		DashboardEditSectionBlock,
		DashboardItemStats,
		ColumnHeader,
		NumberCountFormat,
	],
})
export class DashboardModule {}
