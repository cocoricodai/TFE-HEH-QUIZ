import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DarkModeModule } from '../dark-mode/dark-mode.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FooterComponent } from './component/footer.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PaginationModule,
		RouterModule,
		DarkModeModule,
	],
	declarations: [FooterComponent],
	exports: [FooterComponent],
})
export class FooterModule {}
