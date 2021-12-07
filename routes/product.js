const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/product");
const adminCheck = require("../middleware/adminCheck");
const authenticateUser = require("../middleware/authentication");

router
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, adminCheck, createProduct);

router.route("/upload").post(authenticateUser, adminCheck, uploadImage);

router
  .route("/:id")
  .get(getProduct)
  .patch(authenticateUser, adminCheck, updateProduct)
  .delete(authenticateUser, adminCheck, deleteProduct);

module.exports = router;
