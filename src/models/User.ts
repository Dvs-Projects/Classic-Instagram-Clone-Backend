const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	profileImage: {
		type: String,
		default:
			'https://res.cloudinary.com/dtukhkgvj/image/upload/v1616428691/profile_default_uu46mx.png',
	},
	realName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

UserSchema.methods.encryptPassword = async function (password) {
	const salt = await bcrypt.genSalt(15);
	return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);
