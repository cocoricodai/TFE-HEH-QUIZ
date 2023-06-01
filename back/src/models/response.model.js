module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Response',
		{
			result_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			question_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
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
