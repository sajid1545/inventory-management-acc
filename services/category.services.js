const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
	const result = await Category.create(data);
	return result;
};

exports.getCategoriesService = async (req, res) => {
	const categories = await Category.find({});
	return categories;
};
