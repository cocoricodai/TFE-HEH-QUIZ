const express = require('express');
const router = express.Router();

// Controllers
const sectionBlockController = require('../../controllers/v1/section-block.controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', sectionBlockController.getAllSectionBlock);
router.get('/:id', sectionBlockController.getOneSectionBlock);

// Only Admin can do this action
router.post(
	'/',
	authMiddleware.isAdmin,
	sectionBlockController.createOneSectionBlock
);
router.put(
	'/:id',
	authMiddleware.isAdmin,
	sectionBlockController.modifyOneSectionBlock
);
router.delete(
	'/:id',
	authMiddleware.isAdmin,
	sectionBlockController.deleteOneSectionBlock
);

module.exports = router;
