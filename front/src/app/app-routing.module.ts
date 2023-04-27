import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './core/components/app.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

// Error 404
@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: '**',
				redirectTo: 'page-not-found',
			},
		]),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
