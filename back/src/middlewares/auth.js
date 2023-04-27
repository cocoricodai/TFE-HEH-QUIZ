const jwt = require('jsonwebtoken');
const { UserProfile, Role } = require('../config/db.config');

const responseHelper = require('../helpers/response'); // Formatting the json response

const envConfig = require('../config/env.config');

exports.verifyToken = (req, res, next) => {
	const token = extractToken(req, res);

	try {
		jwt.verify(
			token,
			envConfig.ACCESS_TOKEN_PRIVATE_KEY,
			(err, decodedToken) => {
				if (err) {
					return res
						.status(401)
						.json({ success: false, message: 'Invalid token' });
				}
				req.userID = decodedToken.id;
				next();
			}
		);
	} catch {
		return responseHelper.errorServer(req, res);
	}
};

exports.isAdmin = async function (req, res, next) {
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
