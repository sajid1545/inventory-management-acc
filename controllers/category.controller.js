const { createCategoryService, getCategoriesService } = require("../services/category.services");

exports.createCategory = async (req, res) => {
	try {
		const result = await createCategoryService(req.body);
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


exports.getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService()
        res.status(400).json({
			status: "success",
			data:categories,
		});
    } catch (error) {
        res.status(400).json({
			status: "failed",
			error: error.message,
		}); 
    }
}