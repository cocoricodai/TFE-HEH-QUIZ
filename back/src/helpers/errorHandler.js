const { Sequelize } = require('sequelize');
const responseHelper = require('./response');

exports.error = (req, res, err) => {
	if (
		(err instanceof Sequelize.UniqueConstraintError) |
		(err instanceof Sequelize.ForeignKeyConstraintError)
	) {
		return responseHelper.conflict(
			res,
			err.errors.map((e) => e.message).join(', ')
		);
	} else if (err instanceof Sequelize.ValidationError) {
		return responseHelper.badRequest(
			res,
			err.errors.map((e) => e.message).join(', ')
		);
	} else if (err instanceof Error) {
		return responseHelper.badRequest(res, err.message);
	} else {
		return responseHelper.errorServer(req, res);
	}
};
