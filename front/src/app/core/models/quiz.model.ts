import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { DifficultyType } from './difficulty.type';
import { Question } from './question.model';
import { UserProfileModel } from './user.model';
import { LikeModel } from './like.model';

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
	public isPublished!: boolean;

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

	@jsonMember(LikeModel)
	public likes!: LikeModel;

	constructor(fields: {
		id: number;
		title: string;
		description: string;
		difficulty: DifficultyType;
		userId: string;
		sectionId: number;
		blockId: number;
		isPublished: boolean;
		createdAt: Date;
		tags?: string[] | null;
		questions: Question[];
		profile?: UserProfileModel;
		likes: LikeModel;
	}) {
		Object.assign(this, fields);
	}
}
