const { createStockService, getStocksService } = require("../services/stock.services");

exports.createStock = async (req, res) => {
	try {
		const result = await createStockService(req.body);
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


exports.getAllStocks = async (req, res) => {
    try {
        const categories = await getStocksService()
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