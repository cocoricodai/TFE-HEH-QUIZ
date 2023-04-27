const responseHelper = require('../../helpers/response'); // Formatting the json response
const { Campus } = require('../../config/db.config');
const errorHandler = require('../../helpers/errorHandler');

// Get All Campus
exports.getAllCampus = async (req, res) => {
	try {
		const campus = await Campus.findAll({});

		responseHelper.successWithData(res, 'All campus', campus);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get a Campus by ID
exports.getOneCampus = async (req, res) => {
	const { id } = req.params;

	try {
		const campus = await Campus.findByPk(id);
		if (!campus)
			return responseHelper.badRequest(res, `No campus (${id}) has been found`);
		return responseHelper.successWithData(
			res,
			`${campus.name} (${id}) has been found`,
			campus
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Create a Campus
exports.createOneCampus = async (req, res) => {
	const { name } = req.body;

	try {
		const campus = await Campus.create({ name });

		responseHelper.created(res, `The campus '${campus.name}' has been created`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Modify a Campus
exports.modifyOneCampus = async (req, res) => {
	const { name } = req.body;
	const { id } = req.params;

	try {
		const campus = await Campus.findByPk(id);

		if (!campus)
			return responseHelper.badRequest(res, `No campus (${id}) has been found`);

		await Campus.update({ name }, { where: { id } });

		return responseHelper.success(res, `Campus (${id}) has been updated`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Delete a Campus
exports.deleteOneCampus = async (req, res) => {
	const { id } = req.params;

	try {
		const campus = await Campus.destroy({ where: { id } });
		if (!campus)
			return responseHelper.badRequest(res, `No campus (${id}) has been found`);

		return responseHelper.success(res, `Campus (${id}) has been deleted`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
