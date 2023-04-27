import { NgModule } from '@angular/core';
import { CardModule } from './card/card.module';
import { ChartModule } from './chart/chart.module';
import { DarkModeModule } from './dark-mode/dark-mode.module';
import { FooterModule } from './footer/footer.module';
import { LoadingModule } from './loading/loading.module';
import { PaginationModule } from './pagination/pagination.module';
import { TableListModule } from './table-list/table-list.module';
import { MyToastrModule } from './my-toastr/my-toastr.module';

@NgModule({
	imports: [MyToastrModule],
	exports: [
		DarkModeModule,
		TableListModule,
		PaginationModule,
		ChartModule,
		LoadingModule,
		FooterModule,
		CardModule,
		MyToastrModule,
	],
})
export class SharedModule {}
