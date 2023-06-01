// const nodemailer = require('nodemailer'); // Send mail
// const envConfig = require('../config/env.config');

// let transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: envConfig.MAIL_USER,
// 		pass: envConfig.MAIL_PASSWORD,
// 	},
// });

// exports.sendMail = async (to, subject, text) => {
// 	await transporter.sendMail({
// 		from: '"Quiz ❓" <colin.depelsenaire@gmail.com>',
// 		to,
// 		subject,
// 		text,
// 	});
// };

const envConfig = require('../config/env.config');
const nodemailer = require('nodemailer');
const logger = require('./logger/logger');

let transporter;

if (process.env.NODE_ENV === 'production') {
	transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: envConfig.MAIL_USER,
			pass: envConfig.MAIL_PASSWORD,
		},
	});
}

exports.sendMail = async (to, subject, text) => {
	if (transporter) {
		await transporter.sendMail({
			from: '"Quizaire ❓" <colin.depelsenaire@gmail.com>',
			to,
			subject,
			text,
		});
	} else {
		logger.info(`Email : ${to} , subject : ${subject}, text : ${text}`);
	}
};
