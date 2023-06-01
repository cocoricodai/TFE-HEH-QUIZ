const responseHelper = require('../../helpers/response'); // Formatting the json response
const { Block, SectionBlock } = require('../../config/db.config');
const errorHandler = require('../../helpers/errorHandler');

// Get All Blocks
exports.getAllBlocks = async (req, res) => {
	try {
		const blocks = await Block.findAll({});

		responseHelper.successWithData(res, 'All blocks', blocks);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get a Block by ID
exports.getOneBlock = async (req, res) => {
	const { id } = req.params;

	try {
		const block = await Block.findByPk(id);
		if (!block)
			return responseHelper.badRequest(res, `No block (${id}) has been found`);
		return responseHelper.successWithData(
			res,
			`${block.name} (${id}) has been found`,
			block
		);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Create a Block
exports.createOneBlock = async (req, res) => {
	const { name } = req.body;

	try {
		const block = await Block.create({ name });
		responseHelper.created(res, `The block '${block.name}' has been created`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Modify a Block
exports.modifyOneBlock = async (req, res) => {
	const { name } = req.body;
	const { id } = req.params;

	try {
		const block = await Block.findByPk(id);

		if (!block)
			return responseHelper.badRequest(res, `No block (${id}) has been found`);

		await Block.update({ name }, { where: { id } });

		return responseHelper.success(res, `Block (${id}) has been updated`);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};

// Delete a Block
exports.deleteOneBlock = async (req, res) => {
	const { id } = req.params;

	try {
		const block = await Block.destroy({ where: { id } });
		if (!block)
			return responseHelper.badRequest(res, `No block (${id}) has been found`);

		return responseHelper.success(res, `Block (${id}) has been deleted`);
	} catch (err) {
		responseHelper.errorServer(req, res);
	}
};

// Get all Blocks from a specific Section
exports.getAllBlocksFromSection = async (req, res) => {
	const { id } = req.params;

	try {
		const blocksBySection = await Block.findAll({
			include: [
				{
					model: SectionBlock,
					where: { section_id: id },
					attributes: [],
				},
			],
		});
		if (blocksBySection.length == 0)
			return responseHelper.badRequest(
				res,
				`No Blocks with section (${id}) has been found`
			);

		responseHelper.successWithData(
			res,
			`All Blocks from Section (${id})`,
			blocksBySection
		);
	} catch (err) {
		errorHandler.error(req, res, err);
	}
};
