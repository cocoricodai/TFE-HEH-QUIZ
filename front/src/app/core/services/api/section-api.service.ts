import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { ResponseApi, Section } from '../../models/response-api.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';
import { SectionArrayResponse } from '../../models/response/section/section-array-response.model';
import { SectionObjectResponse } from '../../models/response/section/section-object-response.model';

@Injectable({
	providedIn: 'root',
})
export class SectionApiService {
	private get sectionUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.SECTION
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllSections(): Observable<Section[]> {
		return this._http.get(this.sectionUrl).pipe(
			map((res) => {
				return TypedJSON.parse(res, SectionArrayResponse)!.data;
			})
		);
	}

	public getSectionsByCampus(id: number): Observable<Section[]> {
		return this._http
			.get(this.sectionUrl + ApiConstants.SectionEndpoint.CAMPUS + '/' + id)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, SectionArrayResponse)!.data;
				})
			);
	}

	public getOneSection(id: number): Observable<Section> {
		return this._http.get(this.sectionUrl + '/' + id).pipe(
			map((res) => {
				return TypedJSON.parse(res, SectionObjectResponse)!.data;
			})
		);
	}

	public createOneSection(payload: Section) {
		return this._http.post(this.sectionUrl, payload);
	}

	public modifyOneSection(id: number, payload: Section) {
		return this._http.put(this.sectionUrl + '/' + id, payload);
	}

	public deleteOneSection(id: number) {
		return this._http.delete(this.sectionUrl + '/' + id);
	}
}
