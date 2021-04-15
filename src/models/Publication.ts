const { Schema, model } = require('mongoose');

const PublicationSchema = new Schema({
	imageUrl: {
		type: String,
		required: true,
	},
	place: {
		type: String,
		required: false,
	},
	bio: {
		type: String,
		required: false,
	},
	likes: {
		type: Number,
		default: 0,
		required: false,
	},
	belogs_to: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	public_id: {
		type: String,
		required: true,
	},
});

module.exports = model('Publication', PublicationSchema);
