module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Role',
		{
			name: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueName',
					message: 'models.role.unique',
				},
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
