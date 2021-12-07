const productModel = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllProducts = async (req, res) => {
  const products = await productModel.find({}).select("-user");
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const createProduct = async (req, res) => {
  req.body.user = req.payload.userId;
  const product = await productModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id).select("-user");
  if (!product)
    throw new NotFoundError(`no product found with id ${req.params.id}`);
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!product)
    throw new NotFoundError(`no product found with id ${req.params.id}`);
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product)
    throw new NotFoundError(`no product found with id ${req.params.id}`);
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! product is removed" });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Ecom-API",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
