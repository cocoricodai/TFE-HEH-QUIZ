module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'UserQuizAnswer',
		{
			quiz_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			question_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			isCorrect: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
		}
	);
};
