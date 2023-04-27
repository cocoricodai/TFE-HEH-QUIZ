const logger = require('./logger/logger');

/// Success
// Success 200, OK
exports.success = function (res, message) {
	const jsonData = {
		success: true,
		message,
	};
	return res.status(200).json(jsonData);
};

exports.successWithData = function (res, message, data) {
	const jsonData = {
		success: true,
		message,
		data,
	};
	return res.status(200).json(jsonData);
};

// Success 201, data created
exports.created = function (res, message) {
	const jsonData = {
		success: true,
		message,
	};
	return res.status(201).json(jsonData);
};

/// Client Error
// Error 400, Bad Request
exports.badRequest = function (res, message) {
	const jsonData = {
		success: false,
		message,
	};
	return res.status(400).json(jsonData);
};

exports.badRequestSequelize = function (res, message, err) {
	const jsonData = {
		success: false,
		message,
		errors: err.errors.map((el) => {
			return { attribute: el.path, message: el.message };
		}),
	};
	return res.status(400).json(jsonData);
};

// Error 401, unauthorized
exports.unauthorized = function (res, message) {
	const jsonData = {
		success: false,
		message,
	};
	return res.status(401).json(jsonData);
};

// Error 403, forbidden
exports.forbidden = function (res, message) {
	const jsonData = {
		success: false,
		message,
	};
	return res.status(403).json(jsonData);
};

// Error 404, not found
exports.requestNotFound = function (res, message) {
	const jsonData = {
		success: false,
		message,
	};
	return res.status(404).json(jsonData);
};

// Error 409, conflic
exports.conflict = function (res, message) {
	const jsonData = {
		success: false,
		message,
	};
	return res.status(409).json(jsonData);
};

/// Server Error
// Error 500, internal server error
exports.errorServer = function (req, res) {
	const jsonData = {
		success: false,
		message:
			'The server cannot currently respond to your request. Try again in a few moments...',
	};
	logger.error(`${req.method} ${req.baseUrl}`);
	return res.status(500).json(jsonData);
};
