module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Question',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.TEXT('long'),
				allowNull: true,
			},
			choices: {
				type: DataTypes.STRING,
				allowNull: false,
				get() {
					return this.getDataValue('choices').split(',');
				},
				set(choices) {
					this.setDataValue('choices', choices.join());
				},
				validate: {
					isLengthValid(value) {
						if (value.split(',').length < 2 || value.split(',').length > 4) {
							throw new Error('Min 2 and max 4 answers');
						}
					},
				},
			},
			correctAnswer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			points: {
				type: DataTypes.INTEGER,
				allowNull: false,
				default: 1,
				validate: {
					isPointsValid(value) {
						if (value < 1 || value > 10) {
							throw new Error('Valeure comprise entre 1 et 10');
						}
					},
				},
			},
			quiz_id: {
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
