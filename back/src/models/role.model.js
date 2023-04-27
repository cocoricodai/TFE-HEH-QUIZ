module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Role',
		{
			name: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueName',
					message: 'This role already exists',
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
