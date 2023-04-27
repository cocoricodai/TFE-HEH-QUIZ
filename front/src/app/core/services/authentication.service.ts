import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageConstants } from '../constants/local-storage.constants';
import { LocalStorageManagerService } from './local-storage/local-storage-manager.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	// Lifecycle
	constructor(
		private _router: Router,
		private _localStorageMangerService: LocalStorageManagerService,
		private _userService: UserService,
		private _cookieService: CookieService
	) {}

	public isAuthenticated(): boolean {
		const token = this._localStorageMangerService.getItemString(
			LocalStorageConstants.Key.TOKEN
		);
		return token ? true : false;
	}

	public logout() {
		// Delete in LocalStorage & Cookies
		localStorage.removeItem(LocalStorageConstants.Key.TOKEN);
		this._cookieService.delete(
			LocalStorageConstants.Key.REFRESH_TOKEN,
			'/',
			'localhost'
		);
		// Delete de session
		this._userService.deleteUser();

		// Redirection to Login
		this._router.navigateByUrl('/auth/login');
	}
}
