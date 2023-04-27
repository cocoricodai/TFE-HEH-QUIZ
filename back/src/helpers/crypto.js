const crypto = require('crypto');

exports.getCrypto = () => {
	let cryptoToken = '';

	do {
		cryptoToken = crypto.randomBytes(112).toString('hex');
	} while (cryptoToken.length >= 255);

	return cryptoToken;
};
