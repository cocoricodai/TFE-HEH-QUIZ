import { environment } from 'src/environments/environment';
import { EnvironmentConfigType } from 'src/environments/models/environment-config-type.enum';
import { ApiConstants } from '../constants/api.constant.enums';

export namespace ApiUrlUtils {
	export function apiUrl(): string {
		return EnvironmentConfigType.getApiUrl(environment.type);
	}

	export function getBaseUrl(
		pathVersion: ApiConstants.Version,
		pathRoute: ApiConstants.Route
	): string {
		return apiUrl() + pathVersion + pathRoute;
	}
}
