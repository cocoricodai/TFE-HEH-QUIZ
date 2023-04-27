const express = require('express');
const router = express.Router();

// Controllers
const blockController = require('../../controllers/v1/block.controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', blockController.getAllBlocks);
router.get('/:id', blockController.getOneBlock);
router.get('/section/:id', blockController.getAllBlocksFromSection);

// Only Admin can do this action
router.post('/', authMiddleware.isAdmin, blockController.createOneBlock);
router.put('/:id', authMiddleware.isAdmin, blockController.modifyOneBlock);
router.delete('/:id', authMiddleware.isAdmin, blockController.deleteOneBlock);

module.exports = router;
