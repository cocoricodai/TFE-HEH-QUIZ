module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Block',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: 'UniqueBlock',
					message: 'This block already exists',
				},
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
		}
	);
};
