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
			timeZone: 'Etc/GMT-2',
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
const UserQuizAnswer = models.UserQuizAnswerModel(sequelize, DataTypes);

// Association User and UserProfile
User.hasOne(UserProfile, { foreignKey: 'user_id', as: 'profile' });
UserProfile.belongsTo(User, { foreignKey: 'user_id', as: 'profile' });

// Association UserProfile and Role
Role.hasOne(UserProfile, { foreignKey: 'role_id', as: 'role' });
UserProfile.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// Association UserProfile and Campus
Campus.hasOne(UserProfile, { foreignKey: 'campus_id', as: 'campus' });
UserProfile.belongsTo(Campus, { foreignKey: 'campus_id', as: 'campus' });

// Association UserProfile and Section
Section.hasOne(UserProfile, { foreignKey: 'section_id', as: 'section' });
UserProfile.belongsTo(Section, { foreignKey: 'section_id', as: 'section' });

// Association UserProfile and Block
Block.hasOne(UserProfile, { foreignKey: 'block_id', as: 'block' });
UserProfile.belongsTo(Block, { foreignKey: 'block_id', as: 'block' });

// Association Campus and Section
Campus.hasMany(Section, { foreignKey: 'campus_id' });
Section.belongsTo(Campus, { foreignKey: 'campus_id' });

// Association Section and Block
Block.belongsToMany(Section, {
	through: SectionBlock,
	foreignKey: 'block_id',
});
Section.belongsToMany(Block, {
	through: SectionBlock,
	foreignKey: 'section_id',
});

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

// Association UserQuizAnswers and Quiz
Quiz.hasMany(UserQuizAnswer, { foreignKey: 'quiz_id' });
UserQuizAnswer.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// Association UserQuizAnswers and User
User.hasMany(UserQuizAnswer, { foreignKey: 'user_id' });
UserQuizAnswer.belongsTo(User, { foreignKey: 'user_id' });

// Association UserQuizAnswers and Question
Question.hasMany(UserQuizAnswer, { foreignKey: 'question_id' });
UserQuizAnswer.belongsTo(Question, { foreignKey: 'question_id' });

// Association Like and User
User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// Association Like and Quiz
Quiz.hasMany(Like, { foreignKey: 'quiz_id', as: 'likes' });
Like.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'likes' });

async function dbConnect() {
	try {
		await sequelize.authenticate();
		logger.info('Succefully authenticated to MariaDB!');

		await sequelize.sync({ alter: false });
		logger.info('Successfully synced the models with the database!');

		// await Promise.all([
		// 	Role.bulkCreate(roles),
		// 	Campus.bulkCreate(campus),
		// 	Section.bulkCreate(sections),
		// 	Block.bulkCreate(blocks),
		// 	SectionBlock.bulkCreate(sectionblocks),
		// ]);
		// logger.info('Successfully inserted initial data into the database!');
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
	UserQuizAnswer,
};
