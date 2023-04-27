import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { RoleConstants } from '../constants/roles.constants.enums';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
	constructor(private _router: Router, private _userService: UserService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const currentUserRole = this._userService.getUser.profile.role.name;

		if (currentUserRole === RoleConstants.ADMIN) {
			return true;
		}

		return this._router.navigateByUrl('');
	}
}
