const { createSupplierService, getSuppliersService } = require("../services/supplier.services");

exports.createSupplier = async (req, res) => {
	try {
		const result = await createSupplierService(req.body);
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

exports.getSuppliers = async (req, res) => {
	try {
		const suppliers = await getSuppliersService();
		res.status(400).json({
			status: "success",
			data: suppliers,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};
