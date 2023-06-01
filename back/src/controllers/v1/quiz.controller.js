const responseHelper = require('../../helpers/response'); // Formatting the json response
const errorHandler = require('../../helpers/errorHandler'); // Formating the Error JSON response

const {
	sequelize,
	Quiz,
	Question,
	UserProfile,
	Role,
	Like,
	Report,
	Response,
	Result,
} = require('../../config/db.config');
const { literal, Op } = require('sequelize');
const { getId, getProfile } = require('../../helpers/InfosFromToken');

exports.getAllQuiz = async (req, res) => {
	const profile = await getProfile(req, res);

	const limit = parseInt(req.query.limit) || 8;
	let sort_by = req.query.sort_by || 'id';
	const order_by = req.query.order_by || 'desc';
	const offset = parseInt(req.query.offset) || 0;
	const user_id = req.query.user_id || null;
	const title = req.query.title;

	let where = { isPublic: true, campus_id: profile.campus.id };

	if (title) {
		where.title = {
			[Op.substring]: `${title}`,
		};
	}

	if (profile.role.name !== 'Admin') {
		where.isActive = true;
	}

	if (profile.role.name === 'Student') {
		where.section_id = profile.section.id;
	}

	if (sort_by === 'likes') {
		sort_by = literal(
			'(SELECT COUNT(*) FROM Likes WHERE Likes.quiz_id = Quiz.id)'
		);
	}

	if (user_id) {
		where.user_id = user_id;
	}

	try {
		const quizs = await Quiz.findAll({
			offset,
			limit,
			order: [[sort_by, order_by]],
			where,
			include: [
				{
					model: UserProfile,
					as: 'user_profile',
					include: {
						model: Role,
						as: 'role',
					},
				},
				{
					model: Like,
					as: 'likes',
				},
			],
		});

		const formatedQuizs = quizs.map((quiz) => {
			return {
				...quiz.toJSON(),
				likes: { count: quiz.likes.length },
			};
		});

		responseHelper.successWithData(res, 'All quiz', formatedQuizs);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getOneQuiz = async (req, res) => {
	const { id } = req.params;

	const user_id = getId(req, res);

	try {
		const quiz = await Quiz.findOne({
			where: {
				id,
				isActive: true,
				isPublic: true,
			},
			include: [
				{
					model: Question,
					as: 'questions',
				},
				{
					model: UserProfile,
					as: 'user_profile',
					include: {
						model: Role,
						as: 'role',
					},
				},
				{
					model: Like,
					as: 'likes',
				},
			],
		});
		if (!quiz)
			return responseHelper.badRequest(res, `No quiz (${id}) has been found`);

		const isLiked = quiz.likes.some((like) => {
			return like.user_id === user_id && like.quiz_id === quiz.id;
		});
		const formatedQuizs = {
			...quiz.toJSON(),
			likes: {
				count: quiz.likes.length,
				isLiked,
			},
		};

		return responseHelper.successWithData(
			res,
			`${quiz.title} (${id}) has been found`,
			formatedQuizs
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.createOneQuiz = async (req, res) => {
	const { title, description, difficulty, tags, questions, isPublic } =
		req.body;

	let { section_id, block_id } = req.body;

	// Min and max Questions
	if (questions.length < 4 || questions.length > 20) {
		return responseHelper.badRequest(
			res,
			'Min 4 and max 20  questions for a quiz'
		);
	}

	const userProfile = await getProfile(req, res);

	// Check Student
	if (userProfile.role.name === 'Student') {
		section_id = null;
		block_id = null;
	}

	try {
		await sequelize.transaction(async (transaction) => {
			const quiz = {
				title,
				description,
				difficulty,
				tags,
				total: questions.reduce(
					(total, question) => total + question.points,
					0
				),
				user_id: userProfile.user_id,
				campus_id: userProfile.campus.id,
				section_id: section_id ? section_id : userProfile.section.id,
				block_id: block_id ? block_id : userProfile.block.id,
				isPublic,
			};

			const quizCreate = await Quiz.create(quiz, { transaction });

			const questionsWithQuizId = questions.map((question) => ({
				...question,
				quiz_id: quizCreate.id,
			}));

			await Question.bulkCreate(questionsWithQuizId, { transaction });

			return responseHelper.created(res, 'Your quiz successfuly added');
		});
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

exports.getOwnQuiz = async (req, res) => {
	const status = req.params.status;
	const isPublic = status === 'public' ? true : false | false;
	const sort_by = req.query.sort_by || 'id';
	const order_by = req.query.order_by || 'desc';

	const id = getId(req, res);

	try {
		const quiz = await Quiz.findAll({
			where: {
				user_id: id,
				isActive: true,
				isPublic,
			},
			order: [[sort_by, order_by]],
		});

		if (!quiz) {
			return responseHelper.badRequest(res, 'Error');
		}

		return responseHelper.successWithData(res, 'Your own quiz', quiz);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getQuizCount = async (req, res) => {
	try {
		const totalQuiz = await Quiz.count();

		return responseHelper.successWithData(res, 'Quiz Count', {
			count: totalQuiz,
		});
	} catch {
		responseHelper.errorServer(req, res);
	}
};

exports.getQuizDoneCount = async (req, res) => {
	try {
		const totalQuizDone = await Result.count();

		return responseHelper.successWithData(res, 'Total Quiz done', {
			count: totalQuizDone,
		});
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getQuizDoneStats = async (req, res) => {
	try {
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 7);

		const quizCount = await Result.findAll({
			attributes: [
				[sequelize.literal('DATE(createdAt)'), 'date'],

				[sequelize.fn('count', sequelize.col('id')), 'count'],
			],
			where: {
				createdAt: {
					[Op.gte]: startDate,
					[Op.lte]: new Date(),
				},
			},
			group: [sequelize.literal('DATE(createdAt)')],
			raw: true,
		});

		const dateRange = [];
		let currentDate = new Date(startDate);
		for (let i = 0; i < 7; i++) {
			dateRange.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		const mergedResults = dateRange.map((date) => {
			const matchingResult = quizCount.find((result) => {
				const resultDate = new Date(result.date);
				return resultDate.toDateString() === date.toDateString();
			});

			return {
				date: date.toISOString().slice(0, 10),
				count: matchingResult ? matchingResult.count : 0,
			};
		});

		responseHelper.successWithData(res, 'Get Quiz Done Stats', mergedResults);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getOneOwnQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const id = req.params.id;
	try {
		const quiz = await Quiz.findOne({
			where: { user_id, id, isActive: true },
			include: {
				model: Question,
				as: 'questions',
			},
		});

		if (!quiz) return responseHelper.badRequest(res, 'No Quiz found');

		responseHelper.successWithData(res, 'One QUiz found', quiz);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.likeQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const { id } = req.params;

	try {
		const quiz = await Quiz.findOne({
			where: {
				id,
				isPublic: true,
				isActive: true,
			},
		});

		if (!quiz) return responseHelper.badRequest(res, `Quiz doesn't exist`);

		const like = await Like.findOne({
			where: {
				user_id,
				quiz_id: id,
			},
		});

		if (like) return responseHelper.badRequest(res, 'Like already exist');

		await Like.create({ user_id, quiz_id: id });

		responseHelper.success(res, 'adding like success');
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.unlikeQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const { id } = req.params;

	try {
		const quiz = await Quiz.findOne({
			where: {
				id,
				isPublic: true,
				isActive: true,
			},
		});

		if (!quiz) return responseHelper.badRequest(res, `Quiz doesn't exist`);

		const like = await Like.findOne({
			where: {
				user_id,
				quiz_id: id,
			},
		});

		if (!like) return responseHelper.badRequest(res, `This quiz wasn't liked`);

		await Like.destroy({
			where: {
				user_id,
				quiz_id: id,
			},
		});

		responseHelper.success(res, 'Like deleted');
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.reportQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const { id } = req.params;

	try {
		const quiz = await Quiz.findOne({
			where: {
				id,
				isPublic: true,
				isActive: true,
			},
		});

		if (!quiz) return responseHelper.badRequest(res, `Quiz doesn't exist`);

		const report = await Report.findOne({
			where: {
				user_id,
				quiz_id: id,
			},
		});

		if (report) return responseHelper.badRequest(res, 'Report already exist');

		await Report.create({ user_id, quiz_id: id });

		const count = await Report.count({
			where: {
				quiz_id: id,
			},
		});

		if (count >= 1) {
			await Report.destroy({
				where: {
					quiz_id: id,
				},
			});

			await Quiz.update(
				{ isActive: false },
				{
					where: {
						id,
					},
				}
			);
		}

		responseHelper.success(res, 'Adding report success');
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.createOneResultQuiz = async (req, res) => {
	const quiz_id = req.params['id'];
	const user_id = getId(req, res);

	const responses = req.body;

	try {
		await sequelize.transaction(async (transaction) => {
			const result = {
				quiz_id,
				user_id,
			};

			const createResult = await Result.create(result, { transaction });

			const questions = await Question.findAll({
				where: {
					quiz_id,
				},
				attributes: ['id', 'correctAnswer', 'points'],
			});

			if (questions.length !== responses.length) {
				return responseHelper.badRequest(res, 'This is not the same height');
			}

			if (
				!questions.every((question) =>
					responses.find((response) => response.id === question.id)
				)
			) {
				return responseHelper.badRequest(
					res,
					"All Questions doens't belong to quiz"
				);
			}

			let totalPoints = 0;

			for (const question of questions) {
				let isCorrect = false;
				const response = responses.find(
					(response) => response.id === question.id
				);

				if (response && response.answer === question.correctAnswer) {
					totalPoints += question.points;
					isCorrect = true;
				}

				await Response.create(
					{ question_id: question.id, result_id: createResult.id, isCorrect },
					{ transaction }
				);
			}

			await Result.update(
				{ score: totalPoints },
				{ where: { id: createResult.id }, transaction }
			);

			responseHelper.success(res, 'Result createds');
		});
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Get All Own Results
exports.getOwnResultsQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const limit = parseInt(req.query.limit) || 15;
	const sort_by = req.query.sort_by || 'createdAt';
	const order_by = req.query.order_by || 'desc';
	const offset = parseInt(req.query.offset) | 0;

	try {
		const results = await Result.findAll({
			offset,
			limit,
			order: [[sort_by, order_by]],
			where: {
				user_id,
			},
			include: [
				{
					model: Quiz,
					as: 'quiz',
					where: {
						isActive: true,
						isPublic: true,
					},
					attributes: ['total', 'title'],
				},
			],
		});

		const resultsFormatted = results.map((result) => {
			return {
				id: result.id,
				quiz_id: result.quiz_id,
				title: result.quiz.title,
				score: result.score,
				total: result.quiz.total,
				createdAt: result.createdAt,
			};
		});

		responseHelper.successWithData(res, 'All Own results', resultsFormatted);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Gett All Results from User
exports.getResultsQuizFromUser = async (req, res) => {
	const { id } = req.params;

	const limit = parseInt(req.query.limit) || 15;
	const sort_by = req.query.sort_by || 'createdAt';
	const order_by = req.query.order_by || 'desc';
	const offset = parseInt(req.query.offset) | 0;

	try {
		const results = await Result.findAll({
			offset,
			limit,
			order: [[sort_by, order_by]],
			where: {
				user_id: id,
			},
			include: [
				{
					model: Quiz,
					as: 'quiz',
					where: {
						isActive: true,
						isPublic: true,
					},
					attributes: ['total', 'title'],
				},
			],
		});

		const resultsFormatted = results.map((result) => {
			return {
				id: result.id,
				quiz_id: result.quiz_id,
				title: result.quiz.title,
				score: result.score,
				total: result.quiz.total,
				createdAt: result.createdAt,
			};
		});

		responseHelper.successWithData(
			res,
			'All results from user',
			resultsFormatted
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getOneOwnQuizStats = async (req, res) => {
	const quiz_id = +req.params['id'];
	//const user_id = getId(req, res);
	try {
		const results = await Result.findAll({
			where: {
				quiz_id,
			},
			include: {
				model: Response,
				as: 'responses',
			},
		});

		const questionStats = {};

		results.forEach((result) => {
			result.responses.forEach((response) => {
				const { question_id, isCorrect } = response;

				if (!questionStats[question_id]) {
					questionStats[question_id] = {
						question_id,
						correct: 0,
					};
				}

				if (isCorrect) {
					questionStats[question_id].correct++;
				}
			});
		});

		responseHelper.successWithData(res, 'success', {
			stats: Object.values(questionStats),
			count: results.length,
		});
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.modifyOneOwnQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const quiz_id = +req.params['id'];

	const { title, description, difficulty, tags, questions, isPublic } =
		req.body;

	let { section_id, block_id } = req.body;

	try {
		const userProfile = await getProfile(req, res);

		// Check Student
		if (userProfile.role.name === 'Student') {
			section_id = null;
			block_id = null;
		}
		await sequelize.transaction(async (transaction) => {
			const quiz = {
				title,
				description,
				difficulty,
				tags,
				section_id: section_id ? section_id : userProfile.section.id,
				block_id: block_id ? block_id : userProfile.block.id,
				isPublic,
			};

			await Quiz.update(quiz, {
				where: { id: quiz_id, user_id },
				transaction,
			});

			for (const question of questions) {
				const findQuestion = await Question.findOne({
					where: {
						id: question.id,
						quiz_id,
					},
					transaction,
				});

				if (!findQuestion)
					return responseHelper.badRequest(res, 'Question not found');
				findQuestion.title = question.title;
				await findQuestion.save({ transaction });
			}

			return responseHelper.created(res, 'Your quiz successfuly added');
		});
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

exports.deleteOneOwnQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const quiz_id = +req.params['id'];

	try {
		const quiz = await Quiz.update(
			{
				isActive: false,
			},
			{
				where: {
					user_id,
					id: quiz_id,
				},
			}
		);

		if (!quiz) return responseHelper.badRequest(res, "This quiz doesn't exist");

		return responseHelper.success(res, 'Quiz deleted');
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
