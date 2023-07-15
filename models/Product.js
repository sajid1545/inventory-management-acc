const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

// schema design
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter product name'],
			trim: true,
			unique: [true, 'Name must be unique'],
			minLength: [3, 'Product name must be at least 3 characters long'],
			maxLength: [100, 'Product name must be at most 100 characters long'],
			lowerCase: true,
		},
		description: {
			type: String,
			required: true,
		},

		unit: {
			type: String,
			required: true,
			enum: {
				values: ['kg', 'litre', 'pcs', 'bag'],
				message: 'Unit value can be only kg, litre, bag or pcs',
			},
		},
		imageURLs: [
			{
				type: String,
				required: true,
				validate: [validator.isURL, 'wrong url'],
			},
		],
		category: {
			type: String,
			required: true,
		},
		brand: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: ObjectId,
				required: true,
				ref: 'Brand',
			},
		},
	},
	{ timestamps: true }
);

// mongoose middleware for saving data: pre / post

productSchema.pre('save', function (next) {
	console.log('Before Saving data...');

	if (this.quantity === 0) {
		this.status = 'out-of-stock';
	}

	next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
