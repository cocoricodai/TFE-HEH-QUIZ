import { Injectable } from '@angular/core';
import { UserModel, UserProfileModel } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	// Inner properties
	private _user!: UserModel;
	private _isUserSet: boolean = false;

	// Public
	public set user(user: UserModel) {
		this._user = user;
		this._isUserSet = true;
	}

	public get getUser() {
		return this._user;
	}

	public get isUserSet(): boolean {
		return this._isUserSet;
	}

	public deleteUser() {
		this._isUserSet = false;
	}
}
