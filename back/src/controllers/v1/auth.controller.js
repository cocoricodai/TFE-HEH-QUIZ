const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
	sequelize,
	User,
	UserProfile,
	Role,
	Section,
	SectionBlock,
} = require('../../config/db.config'); // Import Model

const responseHelper = require('../../helpers/response'); // Formatting the JSON response
const errorHandler = require('../../helpers/errorHandler'); // Formating the Error JSON response
const logger = require('../../helpers/logger/logger'); // Logger
const envConfig = require('../../config/env.config'); // Environment Config
const cryptoHelper = require('../../helpers/crypto');

// Register
exports.signup = async (req, res) => {
	const { email, password, campus_id } = req.body;
	let { section_id, block_id } = req.body;

	try {
		await sequelize.transaction(async (transaction) => {
			const cryptoToken = cryptoHelper.getCrypto();

			let role;

			if (/^[a-zA-Z]+.[a-zA-Z]+@std.heh.be$/i.test(email)) {
				if (
					section_id == null ||
					block_id == null ||
					section_id == undefined ||
					block_id == undefined
				) {
					return responseHelper.badRequest(
						res,
						'Section and/or block not provided'
					);
				}

				const sectionInCampus = await Section.findOne({
					where: { campus_id, id: section_id },
				});
				if (!sectionInCampus) {
					return responseHelper.badRequest(
						res,
						"The section doesn't belong to the campus "
					);
				}

				const blockInSection = await SectionBlock.findOne({
					where: { section_id, block_id },
				});
				if (!blockInSection) {
					return responseHelper.badRequest(
						res,
						"The block doesn't belong to the section "
					);
				}

				role = await Role.findOne({ where: { name: 'Student' } });
			} else {
				role = await Role.findOne({ where: { name: 'Teacher' } });
				section_id = null;
				block_id = null;
			}

			const user = await User.create(
				{ email, password, token: cryptoToken },
				{ transaction }
			);

			const fullName = email.split('@')[0];
			const firstName = fullName.split('.')[0];
			const lastName = fullName.split('.')[1];

			const userProfile = {
				user_id: user.id,
				firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
				role_id: role.id,
				campus_id,
				section_id,
				block_id,
			};

			await UserProfile.create(userProfile, { transaction });

			// Sending email
			const subject = 'Confirm ur email';
			const text = `With this link : ${envConfig.WEBSITE_URL}/auth/verify/${user.id}/${cryptoToken}`;
			logger.info(
				`Email : ${user.email} , subject : ${subject}, text : ${text}`
			);
			//mailHelper.sendMail(email, subject, text);

			responseHelper.created(
				res,
				'Your account has been successfully created! Please check your email to confirm your inscription'
			);
		});
	} catch (err) {
		return errorHandler.error(req, res, err);
	}
};

// Verify Account
exports.verifyAccount = (req, res) => {
	const { token, id } = req.body;

	User.findOne({ where: { id } })
		.then((user) => {
			if (user === null)
				return responseHelper.badRequest(res, "This user doesn't exist");
			if (user.token !== token)
				return responseHelper.badRequest(res, 'Invalid token');
			if (user.isActive)
				return responseHelper.badRequest(res, 'User already verified');

			const cryptoToken = cryptoHelper.getCrypto();

			User.update(
				{ isActive: true, token: cryptoToken },
				{
					where: {
						id,
					},
				}
			)
				.then(() => {
					responseHelper.success(res, 'Your account has been verified');
				})
				.catch(() => {
					responseHelper.errorServer(req, res);
				});
		})
		.catch((err) => {
			errorHandler.error(req, res, err);
		});
};

// Login
exports.signin = (req, res) => {
	const { email, password } = req.body;

	User.findOne({
		where: { email },
		include: {
			model: UserProfile,
			as: 'profile',
			include: {
				model: Role,
				as: 'role',
			},
		},
	})
		.then((user) => {
			if (user === null)
				return responseHelper.badRequest(res, "This user doesn't exist");
			if (!user.isActive)
				return responseHelper.badRequest(res, 'Active your account by mail');
			bcrypt
				.compare(password, user.password)
				.then((isCorrect) => {
					if (!isCorrect)
						return responseHelper.badRequest(res, 'Invalid password');

					const token = jwt.sign(
						{ email: user.email, id: user.id, role: user.profile.role.name },
						envConfig.ACCESS_TOKEN_PRIVATE_KEY,
						{ expiresIn: '1d' }
					);

					const refreshToken = jwt.sign(
						{ email: user.email, id: user.id },
						envConfig.REFRESH_TOKEN_PRIVATE_KEY,
						{ expiresIn: '30d' }
					);

					const data = {
						access: token,
					};

					res.cookie('refresh_token', refreshToken, {
						expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
						maxAge: 30 * 24 * 60 * 60 * 1000,
					});

					responseHelper.successWithData(res, 'Sign in success', data);
				})
				.catch(() => {
					responseHelper.errorServer(req, res);
				});
		})
		.catch(() => {
			responseHelper.errorServer(req, res);
		});
};

// Forgot password
exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) return responseHelper.badRequest(res, "This user doesn't exist");

		// Sending email
		const subject = 'Password reset request';
		const text = `With this link : ${envConfig.WEBSITE_URL}/auth/reset-password/${user.token}`;
		logger.info(`Email : ${user.email} , subject : ${subject}, text : ${text}`);
		//mailHelper.sendMail(email, subject, text);

		responseHelper.success(res, 'Mail send! Check your email');
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Reset password
exports.resetPassword = async (req, res) => {
	const { password, token } = req.body;

	try {
		const user = await User.findOne({ where: { token } });

		if (!user) return responseHelper.badRequest(res, "This user doesn't exist");

		const cryptoToken = cryptoHelper.getCrypto();
		User.update(
			{ password, token: cryptoToken },
			{
				where: {
					id: user.id,
				},
				individualHooks: true,
			}
		).then(() => {
			responseHelper.success(res, 'Password updated success');
		});
	} catch (err) {
		return errorHandler.error(req, res, err);
	}
};

// Refresh Token
exports.refreshToken = async (req, res) => {
	const { refresh_token } = req.cookies;

	jwt.verify(
		refresh_token,
		envConfig.REFRESH_TOKEN_PRIVATE_KEY,
		(err, decoded) => {
			if (err) return responseHelper.errorServer(res, err);
			const newToken = jwt.sign(
				{ email: decoded.email, id: decoded.id, role: decoded.role },
				envConfig.ACCESS_TOKEN_PRIVATE_KEY,
				{ expiresIn: '1d' }
			);

			const newRefreshToken = jwt.sign(
				{ email: decoded.email, id: decoded.id },
				envConfig.REFRESH_TOKEN_PRIVATE_KEY,
				{ expiresIn: '30d' }
			);

			res.cookie('refresh_token', newRefreshToken, {
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				maxAge: 30 * 24 * 60 * 60 * 1000,
			});

			responseHelper.successWithData(res, 'Refresh update', {
				token: newToken,
			});
		}
	);
};
