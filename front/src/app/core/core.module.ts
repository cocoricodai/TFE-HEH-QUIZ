import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './components/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		CoreRoutingModule,
		SharedModule,
		TranslateModule.forChild(),
	],
	declarations: [AppComponent, PageNotFoundComponent],
	providers: [],
})
export class CoreModule {}
