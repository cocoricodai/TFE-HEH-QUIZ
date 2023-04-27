const nodemailer = require('nodemailer'); // Send mail
const envConfig = require('../config/env.config');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: envConfig.MAIL_USER,
		pass: envConfig.MAIL_PASSWORD,
	},
});

exports.sendMail = async (to, subject, text) => {
	await transporter.sendMail({
		from: '"Quiz ❓" <colin.depelsenaire@gmail.com>',
		to,
		subject,
		text,
	});
};
