const { ProductModel, CategoryModel } = require("../models");
const { authCookie: authCookieName } = require("../config/config");

module.exports = {
  createProduct: (req, res, next) => {
    const product = req.body;
    console.log(product);
    const { _id } = req.user;

    const {
      title,
      price,
      delivery,
      description,
      popular,
      category,
      imageUrls,
    } = product;
    if (!title || !description || !category || !imageUrls) {
      return res.status(400).send({ msg: "Invalid body!" });
    }
    if (isNaN(price) || isNaN(delivery)) {
      return res
        .status(400)
        .send({ msg: "Price and delivery must be numbers!" });
    }

    ProductModel.create({ ...product, creator: _id, createdOn: Date.now() })
      .then((product) => {
        Promise.all([
          product,
          CategoryModel.updateOne({ _id: category }, { $push: { products: product._id } }),
        ]);
      })
      .then(() => {
        res.status(201).send({ msg: "Successfully created product!" });
      })
      .catch(next);
  },
  getAllProducts: (req, res, next) => {
    ProductModel.find({})
      .populate("category")
      .then((products) => {
        res.status(200).json(products);
      })
      .catch(next);
  },
  getProduct: (req, res, next) => {
    const { id } = req.params;
    ProductModel.find({ _id: id })
      .populate("category")
      .then((currentProduct) => {
        res.status(200).json(currentProduct);
      })
      .catch(next);
  },
  editProduct: (req, res, next) => {
    const { id } = req.params;
    const product = req.body;
    ProductModel.updateOne({ _id: id }, { ...product })
      .then((data) => {
        res.send({ msg: "Successfully updated product!", data });
      })
      .catch(next);
  },
};
