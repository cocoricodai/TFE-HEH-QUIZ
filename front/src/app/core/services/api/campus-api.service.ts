import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { Campus } from '../../models/response-api.model';
import { CampusArrayResponse } from '../../models/response/campus/campus-array-response.model';
import { CampusObjectResponse } from '../../models/response/campus/campus-object-response.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';

@Injectable({
	providedIn: 'root',
})
export class CampusApiService {
	private get campusUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.CAMPUS
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllCampus(): Observable<Campus[]> {
		return this._http.get(this.campusUrl).pipe(
			map((res) => {
				return TypedJSON.parse(res, CampusArrayResponse)!.data;
			})
		);
	}

	public getOneCampus(id: number): Observable<Campus> {
		return this._http.get(this.campusUrl + '/' + id).pipe(
			map((res) => {
				return TypedJSON.parse(res, CampusObjectResponse)!.data;
			})
		);
	}

	public createOneCampus(payload: Campus) {
		return this._http.post(this.campusUrl, payload);
	}

	public modifyOneCampus(id: number, payload: Campus) {
		return this._http.put(this.campusUrl + '/' + id, payload);
	}

	public deleteOneCampus(id: number) {
		return this._http.delete(this.campusUrl + '/' + id);
	}
}
