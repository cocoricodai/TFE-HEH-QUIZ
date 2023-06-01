module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Result',
		{
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			quiz_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			score: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: 'createdAt',
			updatedAt: false,
		}
	);
};
