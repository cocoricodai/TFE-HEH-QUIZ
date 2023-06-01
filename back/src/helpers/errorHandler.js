const { Sequelize } = require('sequelize');
const responseHelper = require('./response');
const { getTranslate } = require('./translate');

exports.error = (req, res, err) => {
	if (
		(err instanceof Sequelize.UniqueConstraintError) |
		(err instanceof Sequelize.ForeignKeyConstraintError)
	) {
		return responseHelper.conflict(
			res,
			err.errors.map((e) => getTranslate(req, e.message)).join(', ')
		);
	} else if (err instanceof Sequelize.ValidationError) {
		return responseHelper.badRequest(
			res,
			err.errors.map((e) => getTranslate(req, e.message)).join(', ')
		);
	} else if (err instanceof Error) {
		return responseHelper.badRequest(res, getTranslate(req, err.message));
	} else {
		return responseHelper.errorServer(req, res);
	}
};
