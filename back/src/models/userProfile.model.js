const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'UserProfile',
		{
			user_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				autoIncrement: false,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter a firstname',
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter a lastName',
					},
				},
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			campus_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			section_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			block_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			hooks: {
				beforeBulkUpdate: async (user) => {
					if (user.attributes.password)
						user.attributes.password = await bcrypt.hash(
							user.attributes.password,
							10
						);
				},
			},
		}
	);
};
