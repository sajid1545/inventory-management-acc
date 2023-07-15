const express = require("express");
const stockController = require("../controllers/stock.controller");
const router = express.Router();

router.route("/").get(stockController.getAllStocks).post(stockController.createStock);
module.exports = router;
