const rateLimit = require('express-rate-limit');

exports.rateLimiterMiddleware = rateLimit({
	windowMs: 120,
	max: 10,
	message: 'You have exceed the request',
	standardHeaders: true,
});
