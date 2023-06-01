const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				unique: {
					name: 'UniqueEmail',
					msg: 'models.user.email.unique',
				},
				allowNull: false,
				validate: {
					notNull: {
						msg: 'models.user.email.notNull',
					},
					validateMail: function (value) {
						if (
							!/^[a-zA-Z]+.[a-zA-Z]+@std.heh.be$/i.test(value) &&
							!/^[a-zA-Z]+.[a-zA-Z]+@heh.be$/i.test(value)
						) {
							throw new Error('models.user.email.validate');
						}
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'models.user.password.notNull',
					},
					validatePassword: function (value) {
						if (
							!/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%.])\S{7,15}$/i.test(
								value
							)
						) {
							throw new Error('models.user.password.validate');
						}
					},
				},
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			hooks: {
				beforeCreate: async (user) => {
					user.password = await bcrypt.hash(user.password, 10);
				},
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
