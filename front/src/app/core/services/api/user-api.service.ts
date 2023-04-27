import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { ResponseApi, User, UserCount } from '../../models/response-api.model';
import { UserProfileModel } from '../../models/user.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';

@Injectable({
	providedIn: 'root',
})
export class UserApiService {
	private get userUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.USER
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllUsers(params?: HttpParams): Observable<User[]> {
		console.log(params);
		return this._http
			.get(this.userUrl, {
				params,
			})
			.pipe(
				map((res) => {
					console.log(res);
					return TypedJSON.parse(res, ResponseApi)?.data;
				})
			);
	}

	public getUsersCount(): Observable<UserCount[]> {
		return this._http.get(this.userUrl + ApiConstants.UserEndpoint.COUNT).pipe(
			map((res) => {
				return TypedJSON.parse(res, ResponseApi)?.data;
			})
		);
	}

	public getUserByPk(uuid: string): Observable<User> {
		return this._http.get(this.userUrl + `/${uuid}`).pipe(
			map((res) => {
				return TypedJSON.parse(res, ResponseApi)?.data;
			})
		);
	}

	public getOwnUser(): Observable<UserProfileModel> {
		return this._http.get(this.userUrl + ApiConstants.UserEndpoint.ME).pipe(
			map((res) => {
				return TypedJSON.parse(res, ResponseApi)?.data;
			})
		);
	}

	public updateProfile(payload: UserProfileModel) {
		return this._http.put(this.userUrl + ApiConstants.UserEndpoint.ME, payload);
	}

	public updatePassword(payload: { password: string }) {
		return this._http.patch(
			this.userUrl + ApiConstants.UserEndpoint.ME,
			payload
		);
	}

	public suspendAccount() {
		return this._http.patch(
			this.userUrl +
				ApiConstants.UserEndpoint.ME +
				ApiConstants.UserEndpoint.SUSPEND,
			null
		);
	}
}
