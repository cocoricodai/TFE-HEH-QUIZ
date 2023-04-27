module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'SectionBlock',
		{
			section_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			block_id: {
				type: DataTypes.INTEGER,
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
