const express = require('express');
const router = express.Router();

// Controllers
const quizController = require('../../controllers/v1/quiz.controller');

router.get('/', quizController.getAllQuiz);
router.post('/', quizController.createOneQuiz);
router.get('/count', quizController.getQuizCount);
router.get('/done/count', quizController.getQuizDoneCount);
router.get('/done/stats', quizController.getQuizDoneStats);
router.get('/:id', quizController.getOneQuiz);
router.post('/:id/like', quizController.likeQuiz);
router.post('/:id/report', quizController.reportQuiz);
router.post('/:id/result', quizController.createOneResultQuiz);
router.delete('/:id/unlike', quizController.unlikeQuiz);
router.get('/me/results', quizController.getOwnResultsQuiz);
router.get('/:id/results', quizController.getResultsQuizFromUser);
router.get('/me/:id', quizController.getOneOwnQuiz);
router.patch('/me/:id', quizController.modifyOneOwnQuiz);
router.delete('/me/:id', quizController.deleteOneOwnQuiz);
router.get('/me/:id/stats', quizController.getOneOwnQuizStats);
router.get('/me/status/:status', quizController.getOwnQuiz);

module.exports = router;
