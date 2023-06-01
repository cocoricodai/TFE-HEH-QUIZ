const { Op } = require('sequelize');
const { Quiz } = require('../config/db.config');

exports.deleteInactiveQuizSince = async () => {
	const date = new Date();
	date.setMonth(date.getMonth() - 3);

	await Quiz.destroy({
		where: {
			isActive: false,
			updatedAt: {
				[Op.lt]: date,
			},
		},
	});
};
