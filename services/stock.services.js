
exports.createStockService = async (data) => {
	const result = await Category.create(data);
	return result;
};

exports.getStocksService = async (req, res) => {
	const categories = await Category.find({});
	return categories;
};
