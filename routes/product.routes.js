const express = require("express");
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.post("/file-upload", upload.array("image"), productController.fileUpload);
router
	.route("/")
	.get(productController.getAllProducts)
	.post(verifyToken, authorization("admin", "store-manager"), productController.createProduct);

router.route("/bulk-update").patch(productController.bulkUpdateProducts);

module.exports = router;
