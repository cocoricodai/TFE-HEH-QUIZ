export enum EnvironmentConfigType {
	Development,
	Production,
}

export namespace EnvironmentConfigType {
	export function getApiUrl(config: EnvironmentConfigType): string {
		switch (config) {
			case EnvironmentConfigType.Development:
				return 'http://localhost:5000/api/';
			case EnvironmentConfigType.Production:
				return 'http://tfequiz.ddns.net:5000/api/';
			default:
				return 'Error';
		}
	}
}
