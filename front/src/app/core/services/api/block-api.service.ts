import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedJSON } from 'typedjson';
import { ApiConstants } from '../../constants/api.constant.enums';
import { Block } from '../../models/response-api.model';
import { ApiUrlUtils } from '../../utils/api-url.utils';
import { BlockArrayResponse } from '../../models/response/block/block-array-response.model';
import { BlockObjectResponse } from '../../models/response/block/block-object-response.model';

@Injectable({
	providedIn: 'root',
})
export class BlockApiService {
	private get blockUrl() {
		return ApiUrlUtils.getBaseUrl(
			ApiConstants.Version.V1,
			ApiConstants.Route.BLOCK
		);
	}

	constructor(private _http: HttpClient) {}

	public getAllBlocks(): Observable<Block[]> {
		return this._http.get(this.blockUrl).pipe(
			map((res) => {
				return TypedJSON.parse(res, BlockArrayResponse)!.data;
			})
		);
	}

	public createOneBlock(payload: Block) {
		return this._http.post(this.blockUrl, payload);
	}

	public getBlocksBySection(id: number): Observable<Block[]> {
		return this._http
			.get(this.blockUrl + ApiConstants.BlockEndpoint.SECTION + '/' + id)
			.pipe(
				map((res) => {
					return TypedJSON.parse(res, BlockArrayResponse)!.data;
				})
			);
	}

	public getOneBlock(id: number): Observable<Block> {
		return this._http.get(this.blockUrl + '/' + id).pipe(
			map((res) => {
				return TypedJSON.parse(res, BlockObjectResponse)!.data;
			})
		);
	}

	public modifyOneBlock(id: number, payload: Block) {
		return this._http.put(this.blockUrl + '/' + id, payload);
	}

	public deleteOneBlock(id: number) {
		return this._http.delete(this.blockUrl + '/' + id);
	}
}
