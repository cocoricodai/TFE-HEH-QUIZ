const express = require('express');
const router = express.Router();

// Controllers
const sectionController = require('../../controllers/v1/section.controller');

// Middlewares
const authMiddleware = require('../../middlewares/auth');

router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getOneSection);
router.get('/campus/:id', sectionController.getAllSectionsFromCampus);

// Only Admin can do this action
router.post('/', authMiddleware.isAdmin, sectionController.createOneSection);
router.put('/:id', authMiddleware.isAdmin, sectionController.modifyOneSection);
router.delete(
	'/:id',
	authMiddleware.isAdmin,
	sectionController.deleteOneSection
);

module.exports = router;
