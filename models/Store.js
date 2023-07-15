const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a store name'],
			trim: true,
			unique: true,
			lowercase: true,
			enum: {
				values: [
					'dhaka',
					'chattogram',
					'rajshahi',
					'sylhet',
					'khulna',
					'barishal',
					'rangpur',
					'mymensingh',
				],
				message: '{VALUE} is not a valid name',
			},
		},

		description: {
			type: String,
		},

		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		manager: {
			name: String,
			contactNumber: String,
			id: {
				type: ObjectId,
				ref: 'User',
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
