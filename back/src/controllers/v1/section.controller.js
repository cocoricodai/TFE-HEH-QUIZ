const responseHelper = require('../../helpers/response'); // Formatting the json response
const { Section, Campus } = require('../../config/db.config');
const { UniqueConstraintError, ValidationError } = require('sequelize');
const errorHandler = require('../../helpers/errorHandler');

// Get All Sections
exports.getAllSections = async (req, res) => {
	try {
		const section = await Section.findAll({
			include: {
				model: Campus,
			},
		});

		const sections = section.map((section) => {
			return {
				id: section.id,
				campus: {
					id: section.Campus.id,
					name: section.Campus.name,
				},
				name: section.name,
			};
		});

		responseHelper.successWithData(res, 'All sections', sections);
	} catch {
		responseHelper.errorServer(req, res);
	}
};

// Get all Sections from a specific Campus
exports.getAllSectionsFromCampus = async (req, res) => {
	const { id } = req.params;

	try {
		const sectionByCampus = await Section.findAll({
			where: { campus_id: id },
		});
		if (sectionByCampus.length == 0)
			return responseHelper.badRequest(
				res,
				`No Sections with campus (${id}) has been found`
			);

		responseHelper.successWithData(
			res,
			`All Sections from Campus (${id})`,
			sectionByCampus
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get a Section by ID
exports.getOneSection = async (req, res) => {
	const { id } = req.params;

	try {
		const section = await Section.findByPk(id, {
			attributes: ['name'],
			include: {
				model: Campus,
			},
		});
		if (!section)
			return responseHelper.badRequest(
				res,
				`No section (${id}) has been found`
			);
		return responseHelper.successWithData(
			res,
			`${section.name} (${id}) has been found`,
			section
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Create a Section
exports.createOneSection = async (req, res) => {
	const { name, campus_id } = req.body;

	const section = {
		name,
		campus_id,
	};

	try {
		await Section.create(section);
		responseHelper.created(
			res,
			`The section '${section.name}' has been created`
		);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Modify a Section
exports.modifyOneSection = async (req, res) => {
	const { campus_id, name } = req.body;
	const { id } = req.params;

	try {
		const section = await Section.findByPk(id);

		if (!section)
			return responseHelper.badRequest(
				res,
				`No section (${id}) has been found`
			);

		await Section.update({ name, campus_id }, { where: { id } });

		return responseHelper.success(res, `Section (${id}) has been updated`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Delete a Section
exports.deleteOneSection = async (req, res) => {
	const { id } = req.params;

	try {
		const section = await Section.destroy({ where: { id } });
		if (!section)
			return responseHelper.badRequest(
				res,
				`No section (${id}) has been found`
			);

		return responseHelper.success(res, `Section (${id}) has been deleted`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
