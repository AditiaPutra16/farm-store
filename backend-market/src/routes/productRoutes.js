const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/", productController.getProducts);
router.post("/", authMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  productController.createProduct
);

module.exports = router;
