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
					msg: 'This e-mail already exists',
				},
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter a email',
					},
					validateMail: function (value) {
						if (
							!/^[a-zA-Z]+.[a-zA-Z]+@std.heh.be$/i.test(value) &&
							!/^[a-zA-Z]+.[a-zA-Z]+@heh.be$/i.test(value)
						) {
							throw new Error(
								'The e-mail must be from the HEH : firstname.lastname@std.heh.be or firstname.lastname@heh.be'
							);
						}
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Please enter a password',
					},
					validatePassword: function (value) {
						if (
							!/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%.])\S{7,15}$/i.test(
								value
							)
						) {
							throw new Error(
								'Your password must be between 7 and 15 characters long and include at least one uppercase letter, one digit, and one special character from the following list: !@#%.'
							);
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
