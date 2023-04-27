import { AnyT, jsonMember, jsonObject } from 'typedjson';
import { UserProfileInfoModel } from './user.model';

@jsonObject
export class ResponseApi {
	@jsonMember(Boolean)
	public success!: boolean;

	@jsonMember(String)
	public message?: string;

	@jsonMember(AnyT)
	public data?: any;

	constructor(fields: { success: boolean; message?: string; data?: any[] }) {
		Object.assign(this, fields);
	}
}

@jsonObject
export class LoginResponse {
	@jsonMember(String)
	public access!: string;

	constructor(access: string) {
		this.access = access;
	}
}

@jsonObject
export class RefreshToken {
	@jsonMember(String)
	public token!: string;

	constructor(token: string) {
		this.token = token;
	}
}

@jsonObject
export class Campus {
	@jsonMember(Number)
	public id?: number;

	@jsonMember(String)
	public name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

@jsonObject
export class Section {
	@jsonMember(Number)
	public id: number;

	@jsonMember(UserProfileInfoModel)
	public campus: UserProfileInfoModel;

	@jsonMember(String)
	public name: string;

	constructor(id: number, campus: UserProfileInfoModel, name: string) {
		this.id = id;
		this.campus = campus;
		this.name = name;
	}
}

@jsonObject
export class Block {
	@jsonMember(Number)
	public id?: number;

	@jsonMember(String)
	public name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

@jsonObject
export class User {
	@jsonMember(String)
	public id?: string;

	@jsonMember(String)
	public email: string;

	@jsonMember(String)
	public isActive: boolean;

	constructor(id: string, email: string, isActive: boolean) {
		this.id = id;
		this.email = email;
		this.isActive = isActive;
	}
}

@jsonObject
export class UserCount {
	@jsonMember(Number)
	public count: number;

	@jsonMember(UserProfileInfoModel)
	public role: UserProfileInfoModel;

	constructor(count: number, role: UserProfileInfoModel) {
		this.count = count;
		this.role = role;
	}
}

@jsonObject
export class Count {
	@jsonMember(Number)
	public count: number;

	constructor(count: number) {
		this.count = count;
	}
}
