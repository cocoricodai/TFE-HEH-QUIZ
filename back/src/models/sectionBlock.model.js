module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'SectionBlock',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			section_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: 'section_block_unique',
			},
			block_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: 'section_block_unique',
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
		}
	);
};
