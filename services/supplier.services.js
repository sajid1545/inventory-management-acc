const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
	const result = await Supplier.create(data);
	return result;
};

exports.getSuppliersService = async (req, res) => {
	const suppliers = await Supplier.aggregate([
		{ $match: {} },
		{
			$lookup: {
				from: "brands",
				localField: "brand.name",
				foreignField: "name",
				as: "brandDetails",
			},
		},
	]);
	return suppliers;
};
