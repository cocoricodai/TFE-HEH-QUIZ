import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	HttpClient,
	HttpClientModule,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/components/app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { TitleStrategy } from '@angular/router';
import { TitleManagerService } from './core/services/title/title-manager.service';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		BrowserModule,
		HttpClientModule,
		CoreModule,
		SharedModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true,
		},
		{
			provide: TitleStrategy,
			useClass: TitleManagerService,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
