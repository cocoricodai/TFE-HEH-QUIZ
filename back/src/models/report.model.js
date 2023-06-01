module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Report',
		{
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
			},
			quiz_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
		}
	);
};
