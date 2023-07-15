const express = require("express");
const brandController = require("../controllers/brand.controller");
const router = express.Router();

router.route("/").get(brandController.getBrands).post(brandController.createBrand);

// router.route('/:id').patch(brandController.updateBrand)

module.exports = router;
