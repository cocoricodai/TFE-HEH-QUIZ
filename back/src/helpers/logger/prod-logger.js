const { format, createLogger, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

function buildProdLogger() {
	return createLogger({
		level: 'debug',
		format: combine(
			timestamp({
				format: 'MMM-DD-YYYY HH:mm:ss',
			}),
			prettyPrint()
		),
		transports: [
			new transports.File({
				level: 'error',
				filename: 'logs/error.log',
			}),
			new transports.Console(),
		],
	});
}

module.exports = buildProdLogger;
