const {
	createStoreService,
	getStoresService,
	getStoreByIdService,
} = require("../services/store.services");

exports.createStore = async (req, res) => {
	try {
		const result = await createStoreService(req.body);
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

exports.getStores = async (req, res) => {
	try {
		const stores = await getStoresService();
		res.status(400).json({
			status: "success",
			data: stores,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

exports.getStoreById = async (req, res) => {
	try {
		const { id } = req.params;
		const store = await getStoreByIdService(id);
		res.status(400).json({
			status: "success",
			data: store,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};
