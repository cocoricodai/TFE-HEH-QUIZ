const responseHelper = require('../../helpers/response'); // Formatting the json response
const errorHandler = require('../../helpers/errorHandler'); // Formating the Error JSON response

const {
	sequelize,
	Quiz,
	Question,
	UserProfile,
	Role,
	Like,
} = require('../../config/db.config');
const { literal } = require('sequelize');
const { getId, getProfile } = require('../../helpers/InfosFromToken');

exports.getAllQuiz = async (req, res) => {
	const limit = parseInt(req.query.limit) || 8;
	let sort_by = req.query.sort_by || 'id';
	const order_by = req.query.order_by || 'desc';

	if (sort_by === 'likes') {
		sort_by = literal(
			'(SELECT COUNT(*) FROM Likes WHERE Likes.quiz_id = Quiz.id)'
		);
	}
	try {
		const quizs = await Quiz.findAll({
			limit,
			order: [[sort_by, order_by]],
			where: {
				isPublished: true,
			},
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
		console.log(err);
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
				isPublished: true,
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
		console.log(err);
		responseHelper.errorServer(req, res);
	}
};

exports.createOneQuiz = async (req, res) => {
	const { title, description, difficulty, tags, questions, isPublished } =
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
				user_id: userProfile.user_id,
				campus_id: userProfile.campus.id,
				section_id: section_id ? section_id : userProfile.section.id,
				block_id: block_id ? block_id : userProfile.block.id,
				isPublished,
			};

			const quizCreate = await Quiz.create(quiz, { transaction });

			for (let i = 0; i < questions.length; i++) {
				let question = questions[i];
				question.quiz_id = quizCreate.id;

				await Question.create(question, { transaction });
			}

			responseHelper.created(res, 'Your quiz successfuly added');
		});
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

exports.getOwnQuiz = async (req, res) => {
	const status = req.params.status;
	const isPublished = status === 'published' ? true : false | false;
	const sort_by = req.query.sort_by || 'id';
	const order_by = req.query.order_by || 'desc';

	const id = getId(req, res);

	try {
		const quiz = await Quiz.findAll({
			where: {
				user_id: id,
				isPublished: isPublished,
			},
			order: [[sort_by, order_by]],
		});

		if (!quiz) {
			return responseHelper.badRequest(res, 'Error');
		}

		return responseHelper.successWithData(res, 'Quizs', quiz);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.getQuizCount = async (req, res) => {
	try {
		const totalQuiz = await Quiz.count();

		return responseHelper.successWithData(res, 'Total Quiz', {
			count: totalQuiz,
		});
	} catch {
		responseHelper.errorServer(req, res);
	}
};

exports.getOneOwnQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const id = req.params.id;
	try {
		const quiz = await Quiz.findOne({
			where: { user_id, id },
			include: {
				model: Question,
				as: 'questions',
			},
		});

		if (!quiz) return responseHelper.badRequest(res, 'Error');

		responseHelper.successWithData(res, 'quiz', quiz);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

exports.likeQuiz = async (req, res) => {
	const user_id = getId(req, res);
	const { id } = req.params;

	try {
		const quiz = await Quiz.findByPk(id);

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
		const quiz = await Quiz.findByPk(id);

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

		responseHelper.success(res, 'like deleted');
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};
