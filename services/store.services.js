const Store = require("../models/Store");

exports.createStoreService = async (data) => {
	const result = await Store.create(data);
	return result;
};

exports.getStoresService = async () => {
	const categories = await Store.find({});
	return categories;
};

exports.getStoreByIdService = async (id) => {
	const categories = await Store.findById(id);
	return categories;
};
