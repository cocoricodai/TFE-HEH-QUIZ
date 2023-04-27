import { jsonMember, jsonObject } from 'typedjson';
import { RoleConstants } from '../constants/roles.constants.enums';
@jsonObject
export class UserProfileInfoModel {
	@jsonMember(Number)
	public id!: number;

	@jsonMember(String)
	public name!: string;

	constructor(fields: { id: number; name: RoleConstants }) {
		Object.assign(this, fields);
	}
}

@jsonObject
export class UserProfileModel {
	@jsonMember(String)
	public firstName!: string;

	@jsonMember(String)
	public lastName!: string;

	@jsonMember(UserProfileInfoModel)
	public role!: UserProfileInfoModel;

	@jsonMember(UserProfileInfoModel)
	public campus!: UserProfileInfoModel;

	@jsonMember(UserProfileInfoModel)
	public section!: UserProfileInfoModel;

	@jsonMember(UserProfileInfoModel)
	public block!: UserProfileInfoModel;

	constructor(fileds: {
		firstName: string;
		lastName: string;
		role: UserProfileInfoModel;
		campus: UserProfileInfoModel;
		section: UserProfileInfoModel;
		block: UserProfileInfoModel;
	}) {
		Object.assign(this, fileds);
	}
}

@jsonObject
export class UserModel {
	@jsonMember(String)
	public email!: string;

	@jsonMember(UserProfileModel)
	public profile!: UserProfileModel;

	constructor(fields: { email: string; profile: UserProfileModel }) {
		Object.assign(this, fields);
	}
}
