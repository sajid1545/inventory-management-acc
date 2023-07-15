const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
	const result = await Stock.create(data);
	return result;
};

exports.getStocksService = async (req, res) => {
	const categories = await Stock.aggregate([
		{ $match: {} },
		{
			$project: {
				store: 1,
				quantity: 1,
				price: { $convert: { input: "$price", to: "int" } },
			},
		},
		{
			$group: {
				_id: "$store.name",
				totalProductPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
			},
		},
	]);
	return categories;
};
