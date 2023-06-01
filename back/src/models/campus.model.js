module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Campus',
		{
			name: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueCampus',
					msg: 'models.campus.unique',
				},
				allowNull: false,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			tableName: 'Campus',
		}
	);
};
