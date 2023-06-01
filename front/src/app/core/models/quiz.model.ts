import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { DifficultyType } from './difficulty.type';
import { Question } from './question.model';
import { UserProfileModel } from './user.model';
import { Like } from './like.model';

@jsonObject
export class Quiz {
	@jsonMember(Number)
	public id!: number;

	@jsonMember(String)
	public title!: string;

	@jsonMember(String)
	public description!: string;

	@jsonMember(String)
	public difficulty!: DifficultyType;

	@jsonArrayMember(String)
	public tags?: string[] | null;

	@jsonMember(Boolean)
	public isPublic!: boolean;

	@jsonMember(Boolean)
	public isActive!: boolean;

	@jsonMember(Number)
	public total!: number;

	@jsonMember(String, { name: 'user_id' })
	public userId!: string;

	@jsonMember(Number, { name: 'section_id' })
	public sectionId!: number;

	@jsonMember(Number, { name: 'block_id' })
	public blockId!: number;

	@jsonArrayMember(Question)
	public questions!: Question[];

	@jsonMember(Date)
	public createdAt!: Date;

	@jsonMember(UserProfileModel, { name: 'user_profile' })
	public profile?: UserProfileModel;

	@jsonMember(Like)
	public likes!: Like;

	constructor(fields: {
		id: number;
		title: string;
		description: string;
		difficulty: DifficultyType;
		userId: string;
		sectionId: number;
		blockId: number;
		isPublic: boolean;
		isActive: boolean;
		total: number;
		createdAt: Date;
		tags?: string[] | null;
		questions: Question[];
		profile?: UserProfileModel;
		likes: Like;
	}) {
		Object.assign(this, fields);
	}
}
