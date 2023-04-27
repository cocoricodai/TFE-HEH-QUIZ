const jwt = require('jsonwebtoken'); // Jwt
const {
	UserProfile,
	Campus,
	Role,
	Section,
	Block,
} = require('../config/db.config'); // Import User Model
const envConfig = require('../config/env.config');

const responseHelper = require('./response'); // Formatting the json response

exports.getId = (req, res) => {
	const token = extractToken(req, res);

	try {
		const decodedToken = jwt.verify(token, envConfig.ACCESS_TOKEN_PRIVATE_KEY);
		return decodedToken.id;
	} catch (err) {
		responseHelper.unauthorized(res, 'Invalid token');
	}
};

exports.getRole = (req, res) => {
	const token = extractToken(req, res);

	try {
		const decodedToken = jwt.verify(token, envConfig.ACCESS_TOKEN_PRIVATE_KEY);
		return decodedToken.role;
	} catch (err) {
		responseHelper.unauthorized(res, 'Invalid token');
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

exports.getProfile = async (req, res) => {
	const id = this.getId(req, res);

	const userProfile = await UserProfile.findOne({
		where: {
			user_id: id,
		},
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
	});

	return userProfile;
};
