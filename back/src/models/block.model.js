module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Block',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: 'UniqueBlock',
					msg: 'models.block.unique',
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
