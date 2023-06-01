const jwt = require('jsonwebtoken');
const { UserProfile, Role, User } = require('../config/db.config');

const responseHelper = require('../helpers/response'); // Formatting the json response

const envConfig = require('../config/env.config');

exports.verifyToken = (req, res, next) => {
	const token = extractToken(req, res);

	try {
		jwt.verify(
			token,
			envConfig.ACCESS_TOKEN_PRIVATE_KEY,
			async (err, decodedToken) => {
				if (err) {
					return res
						.status(401)
						.json({ success: false, message: 'Invalid token' });
				}
				const user = await User.findByPk(decodedToken.id);

				if (!user.isActive)
					return responseHelper.unauthorized(res, 'User inactive !');

				req.userID = decodedToken.id;
				next();
			}
		);
	} catch {
		return responseHelper.errorServer(req, res);
	}
};

exports.isAdmin = async (req, res, next) => {
	const token = extractToken(req, res);

	try {
		const decodedToken = jwt.verify(token, envConfig.ACCESS_TOKEN_PRIVATE_KEY);
		const user = await UserProfile.findByPk(decodedToken.id, {
			include: [{ model: Role, as: 'role', attributes: ['name'] }],
		});

		if (!user) return responseHelper.unauthorized(res, 'User not found!');
		if (user.role.name !== 'Admin')
			return responseHelper.forbidden(res, 'Only and admin can do this action');

		next();
	} catch (err) {
		return responseHelper.unauthorized(res, 'Unauthorized');
	}
};

// Inner work
const extractToken = (req, res) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		return responseHelper.unauthorized(res, 'No token provided! ');
	}

	const authorizationHeaderSplit = authorizationHeader.split(' ');

	if (authorizationHeaderSplit[0] !== 'Bearer') {
		return responseHelper.unauthorized(res, 'Authorization must be bearer!');
	}

	const token = authorizationHeaderSplit[1];

	return token;
};
