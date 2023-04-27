import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { LocalStorageConstants } from '../../constants/local-storage.constants';
import {
	LoginResponse,
	RefreshToken,
	ResponseApi,
} from '../../models/response-api.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationApiService {
	private get authUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.AUTH
		);
	}

	constructor(
		private _http: HttpClient,
		private _cookieService: CookieService
	) {}

	public login(payload: { email: string; password: string }) {
		return this._http
			.post(this.authUrl + ApiConstants.AuthEndpoint.LOGIN, payload, {
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi)?.data as LoginResponse;
				})
			);
	}

	public register(payload: {}) {
		return this._http
			.post(this.authUrl + ApiConstants.AuthEndpoint.REGISTER, payload)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi);
				})
			);
	}

	public forgotPassword(payload: { email: string }) {
		return this._http
			.post(this.authUrl + ApiConstants.AuthEndpoint.FORGOT_PASSWORD, payload)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi);
				})
			);
	}

	public resetPassword(payload: { password: string; token: string }) {
		return this._http
			.put(this.authUrl + ApiConstants.AuthEndpoint.RESET_PASSWORD, payload)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi);
				})
			);
	}

	public verify(payload: { id: string; token: string }) {
		return this._http.put(
			this.authUrl + ApiConstants.AuthEndpoint.VERIFY,
			payload
		);
	}

	public refreshToken() {
		const headers = new HttpHeaders({
			Cookie:
				'refresh_token=' +
				this._cookieService.get(LocalStorageConstants.Key.REFRESH_TOKEN),
		});

		return this._http
			.put(this.authUrl + ApiConstants.AuthEndpoint.REFRESH_TOKEN, null, {
				headers: headers,
				withCredentials: true,
			})
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, ResponseApi)?.data as RefreshToken;
				})
			);
	}
}
