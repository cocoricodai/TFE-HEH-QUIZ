module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Quiz',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: {
						args: [['easy', 'medium', 'hard']],
						msg: 'Must be easy, medium or hard',
					},
				},
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: true,
				get() {
					if (this.getDataValue('tags')) {
						return this.getDataValue('tags').split(',');
					}
					return null;
				},
				set(tags) {
					if (tags) {
						this.setDataValue('tags', tags.join());
					}
					return null;
				},
				validate: {
					isTagsValid(value) {
						if (value) {
							if (value.split(',').length > 3) {
								throw new Error('Un tag ne peux pas avoir plus de 3 types');
							}
						}
					},
				},
			},
			isPublished: {
				type: DataTypes.BOOLEAN,
				default: false,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			campus_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
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
			timestamps: true,
			createdAt: 'createdAt',
			updatedAt: false,
			tableName: 'Quiz',
		}
	);
};
