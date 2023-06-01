import { Component } from '@angular/core';
import { RoleConstants } from 'src/app/core/constants/roles.constants.enums';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'feature-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	// Public properties
	public isAdmin: boolean = false;
	public isSearching: boolean = false;

	//Lifecycle
	constructor(
		private _authenticationService: AuthenticationService,
		private _userService: UserService
	) {}

	ngOnInit(): void {
		const role = this._userService.getUser.profile.role.name;
		this.isAdmin = role === RoleConstants.ADMIN ? true : false;
	}

	// Events
	public logout(): void {
		this._authenticationService.logout();
	}
}
