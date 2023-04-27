import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { TableListComponent } from './components/table-list.component';

@NgModule({
	imports: [CommonModule, FormsModule, PaginationModule, RouterModule],
	declarations: [TableListComponent],
	exports: [TableListComponent],
})
export class TableListModule {}
