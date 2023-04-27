const express = require('express');
const router = express.Router();

// Controllers
const quizController = require('../../controllers/v1/quiz.controller');

router.get('/', quizController.getAllQuiz);
router.post('/', quizController.createOneQuiz);
router.get('/count', quizController.getQuizCount);
router.get('/:id', quizController.getOneQuiz);
router.post('/:id/like', quizController.likeQuiz);
router.delete('/:id/unlike', quizController.unlikeQuiz);
router.get('/me/:id', quizController.getOneOwnQuiz);
router.get('/me/status/:status', quizController.getOwnQuiz);

module.exports = router;
