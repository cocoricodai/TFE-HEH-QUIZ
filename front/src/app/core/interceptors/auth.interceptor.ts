import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageConstants } from '../constants/local-storage.constants';
import { AuthenticationApiService } from '../services/api/authentication-api.service';
import { LocalStorageManagerService } from '../services/local-storage/local-storage-manager.service';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateManagerService } from '../services/translate/translate-manager.service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private _localStorageManagerService: LocalStorageManagerService,
		private _auhtenticationApiService: AuthenticationApiService,
		private _authenticationService: AuthenticationService,
		private _translateManagerService: TranslateManagerService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this._localStorageManagerService.getItemString(
			LocalStorageConstants.Key.TOKEN
		);

		const cloned = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (this._translateManagerService.getCurrentLanguage()) {
			cloned.headers.append(
				'Accept-Language',
				this._translateManagerService.getCurrentLanguage()
			);
		}

		return next.handle(cloned).pipe(
			catchError((err) => {
				if (err.status === HttpStatusCode.Unauthorized) {
					return this.handle401Error(req, next);
				}
				return throwError(() => err);
			})
		);
	}

	private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
		return this._auhtenticationApiService.refreshToken().pipe(
			switchMap((el) => {
				if (el) {
					this._localStorageManagerService.setItemString(
						LocalStorageConstants.Key.TOKEN,
						el.token
					);
					req = req.clone({
						setHeaders: {
							Authorization: `Bearer ${el.token}`,
						},
					});
				}
				return next.handle(req);
			}),
			catchError((err) => {
				this._authenticationService.logout();
				return throwError(() => err);
			})
		);
	}
}
