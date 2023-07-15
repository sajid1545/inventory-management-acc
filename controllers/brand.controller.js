const { createBrandService, getBrandsService } = require("../services/brands.services");

exports.createBrand = async (req, res) => {
	try {
		const result = await createBrandService(req.body);
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

exports.getBrands = async (req, res) => {
	try {
		const brands = await getBrandsService();
		res.status(400).json({
			status: "success",
			data: brands,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};
