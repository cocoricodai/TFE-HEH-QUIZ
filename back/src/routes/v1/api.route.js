var express = require('express');
const router = express.Router();

// Routes
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const campusRoute = require('./campus.route');
const sectionRoute = require('./section.route');
const blockRoute = require('./block.route');
const quizRoute = require('./quiz.route');
const sectionBlockRoute = require('./section-block.route');

// Middlewares
const auth = require('../../middlewares/auth');

// Helpers
const responseHelper = require('../../helpers/response');
const { getTranslate } = require('../../helpers/translate');

router.get('/', (req, res) => {
	return responseHelper.success(res, getTranslate(req, 'welcome'));
});

router.use('/auth', authRoute); // ENDPOINT for authentification
router.use('/campus', campusRoute); // ENDPOINT for campus
router.use('/section', sectionRoute); // ENDPOINT for section
router.use('/block', blockRoute); // ENDPOINT for block
router.use('/section-block', sectionBlockRoute); // ENDPOINT for block

// Need to be Signin to access
router.use('/quiz', auth.verifyToken, quizRoute); // ENDPOINT for quiz
router.use('/user', auth.verifyToken, userRoute); // ENDPOINT for user

module.exports = router;
