import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, switchMap, throwError, timer } from 'rxjs';
import { TranslateManagerService } from '../services/translate/translate-manager.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
	// Lifecycle
	constructor(
		private _toastr: ToastrService,
		private _translateManagerService: TranslateManagerService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === HttpStatusCode.InternalServerError) {
					this._toastr.error(
						this._translateManagerService.getTranslation(
							'status.internalServerError'
						)
					);
				} else if (err.status === HttpStatusCode.Forbidden) {
					this._toastr.error(
						this._translateManagerService.getTranslation('status.forbidden')
					);
				} else if (err.status === HttpStatusCode.TooManyRequests) {
					this._toastr.warning(
						this._translateManagerService.getTranslation(
							'status.tooManyRequests'
						)
					);
					return timer(5000).pipe(switchMap(() => this.intercept(req, next)));
				}
				return throwError(() => err);
			})
		);
	}
}
