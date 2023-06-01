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
					message: 'models.section.unique',
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
