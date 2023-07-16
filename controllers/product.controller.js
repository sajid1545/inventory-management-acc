const {
	createProductService,
	getAllProductsService,
	bulkUpdateProductsService,
} = require("../services/products.services");

exports.createProduct = async (req, res, next) => {
	try {
		const result = await createProductService(req.body);
		res.status(400).json({
			status: "success",
			result,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

exports.getAllProducts = async (req, res, next) => {
	try {
		let filters = { ...req.query };
		const excludedFields = ["page", "sort", "limit"];
		excludedFields.forEach((field) => delete filters[field]);

		let filterString = JSON.stringify(filters);
		filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		filters = JSON.parse(filterString);

		const queries = {};

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			queries.sortBy = sortBy;
		}

		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			queries.fields = fields;
		}

		if (req.query.page) {
			const { page = 1, limit = 10 } = req.query;

			const skip = (page - 1) * Number(limit);
			queries.skip = skip;
			queries.limit = Number(limit);
		}

		const products = await getAllProductsService(filters, queries);
		res.status(200).json({
			status: "success",
			data: products,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

exports.bulkUpdateProducts = async (req, res, next) => {
	try {
		const result = await bulkUpdateProductsService(req.body.ids);
		res.status(200).json({
			status: "success",
			result,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

exports.fileUpload = async (req, res, next) => {
	try {
		res.status(201).json(req.files);
	} catch (error) {
		res.status(400).json({
			status: "failed",

			error: error.message,
		});
	}
};
