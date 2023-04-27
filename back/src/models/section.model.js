module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Section',
		{
			campus_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueSection',
					message: 'This section already exists',
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
