const { Sequelize, DataTypes } = require('sequelize');
const models = require('../models/index');
const envConfig = require('./env.config');

const {
	blocks,
	campus,
	roles,
	sectionblocks,
	sections,
} = require('../insertDB/index');
const logger = require('../helpers/logger/logger');

const sequelize = new Sequelize(
	envConfig.DB_NAME,
	envConfig.DB_USER,
	envConfig.DB_PASSWORD,
	{
		host: envConfig.DB_HOST,
		dialect: 'mariadb',
		dialectOptions: {
			timeZone: 'Europe/Paris',
		},
		logging: false,
	}
);

const User = models.UserModel(sequelize, DataTypes);
const Campus = models.CampusModel(sequelize, DataTypes);
const Section = models.SectionModel(sequelize, DataTypes);
const UserProfile = models.UserProfileModel(sequelize, DataTypes);
const Quiz = models.QuizModel(sequelize, DataTypes);
const Question = models.QuestionModel(sequelize, DataTypes);
const Like = models.LikeModel(sequelize, DataTypes);
const Role = models.RoleModel(sequelize, DataTypes);
const Block = models.BlockModel(sequelize, DataTypes);
const SectionBlock = models.SectionBlockModel(sequelize, DataTypes);
const Report = models.ReportModel(sequelize, DataTypes);
const Result = models.ResultModel(sequelize, DataTypes);
const Response = models.ResponseModel(sequelize, DataTypes);

// Association User and UserProfile
User.hasOne(UserProfile, { foreignKey: 'user_id', as: 'profile' });
UserProfile.belongsTo(User, { foreignKey: 'user_id', as: 'profile' });

// Association UserProfile and Role
Role.hasMany(UserProfile, { foreignKey: 'role_id', as: 'role' });
UserProfile.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// Association UserProfile and Campus
Campus.hasMany(UserProfile, { foreignKey: 'campus_id', as: 'campus' });
UserProfile.belongsTo(Campus, { foreignKey: 'campus_id', as: 'campus' });

// Association UserProfile and Section
Section.hasMany(UserProfile, { foreignKey: 'section_id', as: 'section' });
UserProfile.belongsTo(Section, { foreignKey: 'section_id', as: 'section' });

// Association UserProfile and Block
Block.hasMany(UserProfile, { foreignKey: 'block_id', as: 'block' });
UserProfile.belongsTo(Block, { foreignKey: 'block_id', as: 'block' });

// Association Campus and Section
Campus.hasMany(Section, { foreignKey: 'campus_id' });
Section.belongsTo(Campus, { foreignKey: 'campus_id', as: 'campus' });

// Association Block and SectionBlock
Block.hasMany(SectionBlock, { foreignKey: 'block_id' });
SectionBlock.belongsTo(Block, { foreignKey: 'block_id' });

// Association Section and SectionBlock
Section.hasMany(SectionBlock, { foreignKey: 'section_id' });
SectionBlock.belongsTo(Section, { foreignKey: 'section_id' });

// Association UserProfile and Quiz
UserProfile.hasMany(Quiz, { foreignKey: 'user_id', as: 'user_profile' });
Quiz.belongsTo(UserProfile, { foreignKey: 'user_id', as: 'user_profile' });

// Association Section and Quiz
Campus.hasMany(Quiz, { foreignKey: 'campus_id' });
Quiz.belongsTo(Campus, { foreignKey: 'campus_id' });

// Association Section and Quiz
Section.hasMany(Quiz, { foreignKey: 'section_id' });
Quiz.belongsTo(Section, { foreignKey: 'section_id' });

// Association Block and Quiz
Block.hasMany(Quiz, { foreignKey: 'block_id' });
Quiz.belongsTo(Block, { foreignKey: 'block_id' });

// Association Question and Quiz
Quiz.hasMany(Question, { foreignKey: 'quiz_id', as: 'questions' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'questions' });

// Association Like and User
User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// Association Like and Quiz
Quiz.hasMany(Like, { foreignKey: 'quiz_id', as: 'likes' });
Like.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'likes' });

// Association Report and User
User.hasMany(Report, { foreignKey: 'user_id' });
Report.belongsTo(User, { foreignKey: 'user_id' });

// Association Report and Quiz
Quiz.hasMany(Report, { foreignKey: 'quiz_id', as: 'reports' });
Report.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'reports' });

// Association  Resultat and User
User.hasMany(Result, { foreignKey: 'user_id' });
Result.belongsTo(User, { foreignKey: 'user_id' });

// Association  Resultat and Quiz
Quiz.hasMany(Result, { foreignKey: 'quiz_id' });
Result.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'quiz' });

// Association Response and Result
Result.hasMany(Response, { foreignKey: 'result_id', as: 'responses' });
Response.belongsTo(Result, { foreignKey: 'result_id', as: 'responses' });

// Association Response and Question
Question.hasMany(Response, { foreignKey: 'question_id' });
Response.belongsTo(Question, { foreignKey: 'question_id' });

async function dbConnect() {
	try {
		await sequelize.authenticate();
		logger.info('Succefully authenticated to MariaDB!');

		await sequelize.sync({ alter: false });
		logger.info('Successfully synced the models with the database!');

		const roleCount = await Role.count();
		const campusCount = await Campus.count();
		const sectionCount = await Section.count();
		const blockCount = await Block.count();
		const sectionBlockCount = await SectionBlock.count();

		if (
			roleCount === 0 ||
			campusCount === 0 ||
			sectionCount === 0 ||
			blockCount === 0 ||
			sectionBlockCount === 0
		) {
			await Promise.all([
				Role.bulkCreate(roles),
				Campus.bulkCreate(campus),
				Block.bulkCreate(blocks),
			]);
			await Section.bulkCreate(sections);
			await SectionBlock.bulkCreate(sectionblocks);
			logger.info('Successfully inserted initial data into the database!');
		}
	} catch (err) {
		logger.error('Unable to connect to MariaDB', err);
	}
}

module.exports = {
	sequelize,
	dbConnect,
	User,
	Campus,
	Section,
	UserProfile,
	Quiz,
	Question,
	Like,
	Role,
	Block,
	SectionBlock,
	Report,
	Response,
	Result,
};
