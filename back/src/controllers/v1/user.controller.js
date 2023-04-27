const {
	User,
	UserProfile,
	Role,
	Campus,
	Block,
	Section,
} = require('../../config/db.config'); // Import User Model
const responseHelper = require('../../helpers/response'); // Formatting the json response
const { getId, getRole } = require('../../helpers/InfosFromToken');
const { col, fn, Op } = require('sequelize');
const errorHandler = require('../../helpers/errorHandler');

// Get all users
exports.getAllUsers = async (req, res) => {
	const limit = parseInt(req.query.limit) || 8;
	const offset = parseInt(req.query.offset) || 0;

	const role = getRole(req, res);

	let filterWhere = {};
	let excludeAttributes = [];

	const { email, exclude } = req.query;

	if (email) {
		filterWhere.email = {
			[Op.substring]: `${email}`,
		};
	}

	if (exclude) {
		const excludeSplit = exclude.split(',');
		excludeAttributes = excludeSplit;
	}

	if (role !== 'Admin') {
		excludeAttributes.push('token');
	}

	excludeAttributes.push('password');

	try {
		const user = await User.findAll({
			limit,
			offset,
			attributes: {
				exclude: excludeAttributes,
			},
			where: filterWhere,
		});

		if (!user) return responseHelper.badRequest(res, 'No user found');

		return responseHelper.successWithData(res, 'All users', user);
	} catch (err) {
		console.log(err);
		responseHelper.errorServer(req, res);
	}
};

exports.getUsersCount = async (req, res) => {
	try {
		const userCountByRole = await UserProfile.findAll({
			attributes: [[fn('COUNT', col('role_id')), 'count']],
			group: ['role_id'],
			include: [{ model: Role, as: 'role' }],
		});

		return responseHelper.successWithData(
			res,
			'Count (Group by Role)',
			userCountByRole
		);
	} catch {
		responseHelper.errorServer(req, res);
	}
};

exports.getOwnUser = async (req, res) => {
	const id = getId(req, res);

	try {
		const user = await User.findOne({
			where: { id },
			attributes: { exclude: ['password', 'isActive', 'token'] },
			include: {
				model: UserProfile,
				as: 'profile',
				attributes: ['firstName', 'lastName'],
				include: [
					{
						model: Role,
						as: 'role',
					},

					{
						model: Campus,
						as: 'campus',
					},

					{
						model: Section,
						as: 'section',
						attributes: ['id', 'name'],
					},

					{
						model: Block,
						as: 'block',
					},
				],
			},
		});

		return responseHelper.successWithData(res, `Get own informations`, user);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get one user by Id
exports.getOneUser = async (req, res) => {
	const userId = req.params.id;
	const role = getRole(req, res);

	let excludeAttributes = [];

	const { exclude } = req.query;

	if (exclude) {
		const excludeSplit = exclude.split(',');
		excludeAttributes = excludeSplit;
	}

	if (role !== 'Admin') {
		excludeAttributes.push('token');
	}

	excludeAttributes.push('password');

	try {
		const user = await User.findByPk(userId, {
			attributes: {
				exclude: excludeAttributes,
			},
			include: {
				model: UserProfile,
				as: 'profile',
				attributes: ['firstName', 'lastName'],
				include: [
					{
						model: Role,
						as: 'role',
					},

					{
						model: Campus,
						as: 'campus',
					},

					{
						model: Section,
						as: 'section',
						attributes: ['id', 'name'],
					},

					{
						model: Block,
						as: 'block',
					},
				],
			},
		});
		if (!user)
			return responseHelper.badRequest(
				res,
				`No user (${userId}) has been found`
			);
		return responseHelper.successWithData(
			res,
			`Single user recovery : ${req.params.id}`,
			user
		);
	} catch {
		responseHelper.errorServer(req, res);
	}
};

// Modify own User
exports.modifyOwnUser = async (req, res) => {
	const { firstName, lastName, campus_id, section_id, block_id } = req.body;

	const id = getId(req);

	try {
		await UserProfile.update(
			{ firstName, lastName, campus_id, section_id, block_id },
			{
				where: {
					user_id: id,
				},
			}
		);

		responseHelper.success(res, 'User changed sucessfully');
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Modify one User
exports.modifyOneUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findOne({ where: { id } });

		if (!user)
			return responseHelper.badRequest(
				res,
				`No user with id ${id} has been found`
			);
		var msg = `User ${id} changed sucessfully`;
		responseHelper.success(res, msg);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

exports.modifyOwnPassword = async (req, res) => {
	const { password } = req.body;
	const id = getId(req);

	try {
		await User.update(
			{ password },
			{
				where: {
					id,
				},
			}
		);

		responseHelper.success(res, 'User password changed successfully');
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Suspend own Account
exports.suspendOwnAccount = async (req, res) => {
	const id = getId(req);

	try {
		await User.update(
			{
				isActive: false,
			},
			{
				where: {
					id,
				},
			}
		);
		responseHelper.success(res, 'User suspend successfull !');
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Delete one User
exports.deleteOneUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.destroy({ where: { id } });

		if (!user)
			return responseHelper.badRequest(
				res,
				`No user with id ${id} has been found`
			);

		return responseHelper.success(
			res,
			`The user ${id} hes been sucessfully deleted`
		);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
