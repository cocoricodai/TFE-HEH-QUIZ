const express = require('express');
const router = express.Router();

// Controllers
const campusController = require('../../controllers/v1/campus.controller');

// Middlewares
const authMiddleware = require('../../middlewares/auth');

router.get('/', campusController.getAllCampus);
router.get('/:id', campusController.getOneCampus);

// Only Admin can do this action
router.post('/', authMiddleware.isAdmin, campusController.createOneCampus);
router.put('/:id', authMiddleware.isAdmin, campusController.modifyOneCampus);
router.delete('/:id', authMiddleware.isAdmin, campusController.deleteOneCampus);

module.exports = router;
