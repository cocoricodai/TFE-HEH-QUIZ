import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../constants/api.constant.enums';
import { ApiUrlUtils } from '../../utils/api-url.utils';

export abstract class ApiBaseService {
	protected pathVersion: ApiConstants.Version = ApiConstants.Version.V1;
	protected pathRoute: ApiConstants.Route = ApiConstants.Route.NONE;

	protected get _baseUrl(): string {
		return ApiUrlUtils.getBaseUrl(this.pathVersion, this.pathRoute);
	}

	constructor(private _http: HttpClient) {}
}
