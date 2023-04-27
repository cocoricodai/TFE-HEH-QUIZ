import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { ResponseApi, User } from '../models/response-api.model';
import { UserModel } from '../models/user.model';
import { UserApiService } from '../services/api/user-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private _userApiService: UserApiService,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _router: Router
	) {}

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		if (
			!this._authenticationService.isAuthenticated() &&
			!this._userService.isUserSet
		) {
			this._router.navigate(['/auth/login']);
			return false;
		} else if (
			this._authenticationService.isAuthenticated() &&
			!this._userService.isUserSet
		) {
			try {
				const user: UserModel | any = await this._userApiService
					.getOwnUser()
					.toPromise();
				this._userService.user = user;
				return true;
			} catch {
				return false;
			}
		}
		return true;
	}
}
