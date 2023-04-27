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

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
	// Lifecycle
	constructor(private _toastr: ToastrService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === HttpStatusCode.InternalServerError) {
					this._toastr.error('Serveur down');
				} else if (err.status === HttpStatusCode.Forbidden) {
					this._toastr.error('Vous ne pouvez pas y avoir accès');
				} else if (err.status === HttpStatusCode.TooManyRequests) {
					this._toastr.warning('Trop de requetes, veuillez allez moins vite');
					return timer(5000).pipe(switchMap(() => this.intercept(req, next)));
				}
				return throwError(() => err);
			})
		);
	}
}
