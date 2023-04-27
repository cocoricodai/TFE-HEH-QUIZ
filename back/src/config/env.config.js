const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path: path.resolve(__dirname + `../../../.env.${process.env.NODE_ENV}`),
});

module.exports = {
	ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
	REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,

	MAIL_USER: process.env.MAIL_USER,
	MAIL_PASSWORD: process.env.MAIL_PASSWORD,

	WEBSITE_URL: process.env.WEBSITE_URL,

	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,

	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
};
