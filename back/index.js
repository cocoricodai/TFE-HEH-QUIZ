var express = require('express'); // Management routes, endpoints.
const bodyParser = require('body-parser'); // Allows to parse the data of an HTTP request body
const morgan = require('morgan');
const cors = require('cors'); // A security implementied by browers to prevent HTTP requests between different
const cookieParser = require('cookie-parser');

const { dbConnect } = require('./src/config/db.config'); // Config DataBase
const { requestNotFound } = require('./src/helpers/response'); // Formatting the json response
const apiRouteV1 = require('./src/routes/v1/api.route'); // All routes are in this file
const logger = require('./src/helpers/logger/logger'); // Logger
const { rateLimiterMiddleware } = require('./src/middlewares/rateLimiter');
const i18n = require('i18n');
const { deleteInactiveQuizSince } = require('./src/cron/cron');

const envConfig = require('./src/config/env.config');

const app = express();
const port = envConfig.PORT || 5000; // Get port from the host or a default port

i18n.configure({
	locales: ['en-US', 'fr-BE'],
	defaultLocale: 'en-US',
	directory: __dirname + '/i18n',
	objectNotation: true,
});

// Connect our API to our DataBase
dbConnect();

// Middleware
app.use(
	cors({ origin: envConfig.WEBSITE_URL, credentials: true }),
	cookieParser(),
	bodyParser.json({ limit: '50mb' }),
	rateLimiterMiddleware,
	morgan('dev'),
	i18n.init
);

// Route Versionning
app.use('/api/v1', apiRouteV1); // v1

// Error 404, the page asked doesn't exist
app.all('*', ({ res }) => {
	requestNotFound(
		res,
		'Unable to find the requested resource. Try another URL.'
	);
});

// Cron
setInterval(deleteInactiveQuizSince, 24 * 60 * 60 * 1000);

// Listening to the port
app.listen(port, () => {
	logger.info(`Listening to requests on http://localhost:${port}`);
});
