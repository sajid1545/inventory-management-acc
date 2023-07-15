const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a category name'],
			lowercase: true,
			unique: true,
		},
		description: String,
		imageURL: {
			type: String,
			validate: [validator.isURL, 'Please provide a valid URL'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
