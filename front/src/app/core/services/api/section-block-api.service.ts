import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { ApiUrlUtils } from '../../utils/api-url.utils';
import { SectionBlock } from '../../models/section-block.model';
import { SectionBlockArrayResponse } from '../../models/response/section-block/section-block-array-response.model';
import { SectionBlockObjectResponse } from '../../models/response/section-block/section-block-object-response.model';

@Injectable({
	providedIn: 'root',
})
export class SectionBlockApiService {
	private get sectionBlockUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.SECTIONBLOCK
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllSectionBlocks(): Observable<SectionBlock[]> {
		return this._http.get(this.sectionBlockUrl).pipe(
			map((res) => {
				return TypedJSON.parse(res, SectionBlockArrayResponse)!.data;
			})
		);
	}

	public getOneSectionBlock(id: number): Observable<SectionBlock> {
		return this._http.get(this.sectionBlockUrl + '/' + id).pipe(
			map((res) => {
				return TypedJSON.parse(res, SectionBlockObjectResponse)!.data;
			})
		);
	}

	public modifyOneSectionBlock(id: number, payload: SectionBlock) {
		return this._http.put(this.sectionBlockUrl + '/' + id, payload);
	}

	public createOneSectionBlock(payload: SectionBlock) {
		return this._http.post(this.sectionBlockUrl, payload);
	}

	public deleteOneSectionBlock(id: number) {
		return this._http.delete(this.sectionBlockUrl + '/' + id);
	}
}
