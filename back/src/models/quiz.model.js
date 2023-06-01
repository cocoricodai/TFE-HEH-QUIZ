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
						msg: 'models.quiz.difficulty.validate',
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
								throw new Error('model.quiz.tags.validate');
							}
						}
					},
				},
			},
			isPublic: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			total: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
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
			updatedAt: 'updatedAt',
			tableName: 'Quiz',
		}
	);
};
