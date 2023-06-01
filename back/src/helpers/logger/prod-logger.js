const { format, createLogger, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const dayjs = require('dayjs');

function buildProdLogger() {
	const year = dayjs().year();
	const month = dayjs().format('MMMM');
	const day = dayjs().format('DD');
	const logPath = `logs/${year}/${month}/${day}`;

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
				filename: `${logPath}/error.log`,
			}),
			new transports.Console(),
		],
	});
}

module.exports = buildProdLogger;
