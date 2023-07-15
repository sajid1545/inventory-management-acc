const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.createProductService = async (data) => {
	const product = await Product.create(data);

	const { _id: productId, brand } = product;

	const result = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });

	return result;
};

exports.getAllProductsService = async (filters, queries) => {
	const products = await Product.find(filters)
		.select(queries.fields)
		.skip(queries.skip)
		.limit(queries.limit);
	// const products = await Product.aggregate([
	// 	{ $match: {} },
	// 	{
	// 		$lookup: {
	// 			from: "brands",
	// 			localField: "brand.name",
	// 			foreignField: "name",
	// 			as: "brandDetails",
	// 		},
	// 	},
	// ]);
	return products;
};

exports.bulkUpdateProductsService = async (ids) => {
	const products = [];
	ids.forEach((product) => {
		products.push(Product.updateOne({ _id: product.id }, product.data, { runValidators: true }));
	});

	const result = Promise.all(products);
	return result;
};
