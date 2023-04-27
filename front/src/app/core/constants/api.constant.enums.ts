export namespace ApiConstants {
	export const URL = 'http://localhost:5000/api/';

	export enum Version {
		V1 = 'v1',
		V2 = 'v2',
	}

	export enum Route {
		NONE = '',
		AUTH = '/auth',
		CAMPUS = '/campus',
		SECTION = '/section',
		BLOCK = '/block',
		USER = '/user',
		QUIZ = '/quiz',
	}

	export enum AuthEndpoint {
		LOGIN = '/signin',
		REGISTER = '/signup',
		REFRESH_TOKEN = '/refresh-token',
		FORGOT_PASSWORD = '/forgot-password',
		RESET_PASSWORD = '/reset-password',
		VERIFY = '/verify',
	}

	export enum SectionEndpoint {
		CAMPUS = '/campus',
	}

	export enum BlockEndpoint {
		SECTION = '/section',
	}

	export enum UserEndpoint {
		COUNT = '/count',
		ME = '/me',
		SUSPEND = '/suspend',
	}

	export enum QuizEndpoint {
		COUNT = '/count',
		ME = '/me',
	}
}
