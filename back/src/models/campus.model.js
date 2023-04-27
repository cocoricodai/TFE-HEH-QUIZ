module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Campus',
		{
			name: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueCampus',
					message: 'This campus already exists',
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
