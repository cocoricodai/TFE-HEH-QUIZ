const responseHelper = require('../../helpers/response');
const errorHandler = require('../../helpers/errorHandler');
const { SectionBlock } = require('../../config/db.config');

// Get All SectionBlock
exports.getAllSectionBlock = async (req, res) => {
	try {
		const sectionBlocks = await SectionBlock.findAll({});

		responseHelper.successWithData(res, 'all section blocks', sectionBlocks);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get One SectionBlock
exports.getOneSectionBlock = async (req, res) => {
	const { id } = req.params;

	try {
		const sectionBlock = await SectionBlock.findByPk(id);
		if (!sectionBlock)
			return responseHelper.badRequest(
				res,
				`No SectionBlock (${id}) has been found`
			);
		return responseHelper.successWithData(
			res,
			`${id} has been found`,
			sectionBlock
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Create One SectionBlock
exports.createOneSectionBlock = async (req, res) => {
	const { section_id, block_id } = req.body;

	try {
		await SectionBlock.create({ section_id, block_id });

		responseHelper.created(res, `The section block has been created`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Modify One SectionBlock
exports.modifyOneSectionBlock = async (req, res) => {
	const { section_id, block_id } = req.body;
	const { id } = req.params;

	try {
		const sectionBlock = await SectionBlock.findByPk(id);

		if (!sectionBlock)
			return responseHelper.badRequest(res, `No sectionBlock has been found`);

		await SectionBlock.update({ section_id, block_id }, { where: { id } });

		return responseHelper.success(res, `SectionBlock has been updated`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Delete One Section Block
exports.deleteOneSectionBlock = async (req, res) => {
	const { id } = req.params;

	try {
		const sectionBlock = await SectionBlock.destroy({ where: { id } });
		if (!sectionBlock)
			return responseHelper.badRequest(res, `No sectionBlock has been found`);

		return responseHelper.success(res, `SectionBlock has been deleted`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
